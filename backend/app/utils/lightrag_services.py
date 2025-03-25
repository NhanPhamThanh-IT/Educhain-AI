import os
import logging
import asyncio
from dotenv import load_dotenv

from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import openai_embed, gpt_4o_mini_complete
from lightrag.utils import EmbeddingFunc
from lightrag.kg.shared_storage import initialize_pipeline_status

load_dotenv()
ROOT_DIR = os.getcwd()
WORKING_DIR = f"{ROOT_DIR}/lightrag"

# Configure logging
logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.INFO)

# Create working directory if it doesn't exist
if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

def get_embedding_func():
    """Create and return the embedding function."""
    return EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
    )

async def initialize_rag(course_name="papers"):
    """Initialize and return a LightRAG instance with the specified course name."""
    working_dir = f"{WORKING_DIR}/{course_name}-pg"
    
    # Create course directory if it doesn't exist
    if not os.path.exists(working_dir):
        os.mkdir(working_dir)
    
    embedding_func = get_embedding_func()
    
    rag = LightRAG(
        course_name=course_name,
        working_dir=working_dir,
        llm_model_func=gpt_4o_mini_complete,
        llm_model_name="gpt-4o-mini",
        llm_model_max_async=4,
        llm_model_max_token_size=32768,
        enable_llm_cache_for_entity_extract=True,
        embedding_func=embedding_func,
        chunk_token_size=512,
        chunk_overlap_token_size=256,
        
        kv_storage="PGKVStorage",
        doc_status_storage="PGDocStatusStorage",
        graph_storage="PGGraphStorage",
        vector_storage="PGVectorStorage",
        auto_manage_storages_states=False,
    )

    await rag.initialize_storages()
    await initialize_pipeline_status()
    
    # Add embedding function for graph database
    rag.chunk_entity_relation_graph.embedding_func = rag.embedding_func
    
    return rag

async def query_rag(query, course_name="papers", mode="naive", only_need_context=True):
    """
    Query the RAG system with the specified parameters.
    
    Args:
        query (str): The query text
        course_name (str): Name of the course to query
        mode (str): Query mode ("naive", "local", "global", or "hybrid")
        only_need_context (bool): Whether to return only the context
        
    Returns:s
        dict: Response from the RAG system
    """
    rag = await initialize_rag(course_name)
    
    param = QueryParam(mode=mode, only_need_context=only_need_context)
    result = await rag.aquery(query, param=param)
    
    return result
    

async def insert_document(document_text, course_name="papers"):
    """
    Insert a document into the RAG system.
    
    Args:
        document_text (str): The document text to insert
        course_name (str): Name of the course to insert into
        
    Returns:
        bool: True if successful
    """
    rag = await initialize_rag(course_name)
    
    try:
        await rag.ainsert(document_text)
        return True
    except Exception as e:
        logging.error(f"Error inserting document: {e}")
        return False
    
    