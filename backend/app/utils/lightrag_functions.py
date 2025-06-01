import os
import logging
import asyncio
from dotenv import load_dotenv

from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import openai_embed, gpt_4o_mini_complete
from lightrag.utils import EmbeddingFunc
from lightrag.kg.shared_storage import initialize_pipeline_status
from typing import List, Dict, Optional
# from app.prompt import commands


os.environ["POSTGRES_HOST"] = os.getenv("POSTGRES_HOST", "localhost")
os.environ["POSTGRES_PORT"] = os.getenv("POSTGRES_PORT", "5432")
os.environ["POSTGRES_USER"] = os.getenv("POSTGRES_USER", "rag")
os.environ["POSTGRES_PASSWORD"] = os.getenv("POSTGRES_PASSWORD", "rag")
os.environ["POSTGRES_DATABASE"] = os.getenv("POSTGRES_DATABASE", "rag")

load_dotenv()
ROOT_DIR = os.getcwd()
WORKING_DIR = f"{ROOT_DIR}/lightrag"

# Configure logging
logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.DEBUG)

# Create working directory if it doesn't exist
if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)



def normalize_docs_id(docs_id: str) -> str:
    """
    Normalize the course name by removing spaces and converting to lowercase.
    
    Args:
        docs_id (str): The course name to normalize.
        
    Returns:
        str: The normalized course name.
    """
    return docs_id.replace(" ", "").lower()

def hash_docs_id(docs_id: List[str]) -> str:
    hashed_docs_id = []

    for doc_id in docs_id:
        doc_id = doc_id.replace(" ", "").lower()
        
        def shift_char(c):
            if 'a' <= c <= 'z':
                return chr(((ord(c) - ord('a') + 3) % 26) + ord('a'))
            return c  
        
        doc_id = "".join(shift_char(c) for c in doc_id)
        hashed_docs_id.append(doc_id)    

    return hashed_docs_id  


def get_embedding_func():
    """Create and return the embedding function."""
    return EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
    )

async def initialize_rag():
    """Initialize and return a LightRAG instance with the specified course name."""
    working_dir = f"{WORKING_DIR}/lightrag-Educhain"
    
    # Create course directory if it doesn't exist
    if not os.path.exists(working_dir):
        os.mkdir(working_dir)
    
    embedding_func = get_embedding_func()
    
    rag = LightRAG(
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

rag = None
async def initialize_rag_instance():
    global rag
    if rag is None:
        rag = await initialize_rag()


async def query_rag(query: str, docs_id: List[str], mode: str = "naive", only_need_context=True):
    """
    Query the RAG system with the specified parameters.
    
    Args:
        query (str): The query text
        docs_id (str): Name of the course to query
        mode (str): Query mode ("naive", "local", "global", or "hybrid")
        only_need_context (bool): Whether to return only the context
        
    Returns:s
        dict: Response from the RAG system

    """
    await initialize_rag_instance()

    # docs_id = [hash_docs_id(docs_id)]
    
    param = QueryParam(mode=mode, only_need_context=only_need_context, ids = docs_id)

    result = await rag.aquery(query, param=param)

    return result
    
async def query_rag_study_guide(query_task: str, docs_id: List[str], mode: str = "global", only_need_context=False): 
    """
    Query the RAG system with the specified parameters for study guide generation.
    
    Args:
        query (str): The query text
        docs_id (str): Name of the course to query
        mode (str): Query mode ("naive", "local", "global", or "hybrid")
        only_need_context (bool): Whether to return only the context
        
    Returns:
        dict: Response from the RAG system
    """
    await initialize_rag_instance()
    # docs_id = hash_docs_id(docs_id)
    # rag = await initialize_rag()
    
    param = QueryParam(mode=mode, only_need_context=only_need_context, ids = docs_id)

    result = await rag.aquery(query_task, param=param)
    
    return result

# Add task as query to RAG system
# Call LLM to generate quiz questions

async def query_rag_quiz(query_task: str, docs_id: List[str], mode: str = "global", only_need_context=False):
    """
    Query the RAG system with the specified parameters for quiz generation.
    
    Args:
        query (str): The query text
        docs_id (str): Name of the course to query
        mode (str): Query mode ("naive", "local", "global", or "hybrid")
        only_need_context (bool): Whether to return only the context
        
    Returns:
        dict: Response from the RAG system
    """
    await initialize_rag_instance()
    # docs_id = hash_docs_id(docs_id)
    # rag = await initialize_rag()
    
    param = QueryParam(mode=mode, only_need_context=only_need_context, ids = [docs_id])

    result = await rag.aquery(query_task, param=param)
    
    return result

    
async def insert_document(document_text: str, doc_id: str):
    """
    Insert a document into the RAG system.
    
    Args:
        document_text (str): The document text to insert
        docs_id (str): Name of the course to insert into
        
    Returns:
        bool: True if successful
    """
    await initialize_rag_instance()
    # rag = await initialize_rag()
    
    try:
        print("Inserting document...")
        await rag.ainsert(document_text, ids=[hash_docs_id(doc_id)])
        print("Document inserted successfully.")
        return True
    except Exception as e:
        logging.error(f"Error inserting document: {e}")
        return False
    
async def delete_document(document_id, docs_id="papers"):
    """
    Delete a document from the RAG system.
    
    Args:
        document_id (str): The ID of the document to delete
        docs_id (str): Name of the course to delete from
        
    Returns:
        bool: True if successful
    """
    await initialize_rag_instance()
    # rag = await initialize_rag()
    
    try:
        print("Deleting document...")
        await rag.adelete(document_id, ids=hash_docs_id(docs_id))
        print("Document deleted successfully.")
        return True
    except Exception as e:
        logging.error(f"Error deleting document: {e}")
        return False
    
async def get_graph_labels(docs_id: str):
    """
    Get the labels of the graph for the specified course.
    
    Args:
        docs_id (str): Name of the course
        
    Returns:
        list: List of labels in the graph
    """
    await initialize_rag_instance()
    # rag = await initialize_rag()
    
    docs_id = [hash_docs_id(docs_id)]
    
    labels = await rag.get_graph_labels()
    
    return labels

async def export_lightrag_data(output_dir: str = None):
    """
    Export the LightRAG data to a specified directory.
    
    Returns:
        str: Path to the exported data directory
    """
    await initialize_rag_instance()
    if output_dir is None:
        output_dir = f"{WORKING_DIR}/exported_data"
    # rag = await initialize_rag()
    
    export_dir = f"{WORKING_DIR}/exported_data"
    
    if not os.path.exists(export_dir):
        os.mkdir(export_dir)
    
    await rag.aexport_data(output_path = export_dir)
    
    return export_dir

if __name__ == "__main__":
    # Test insert_document with paper.txt
    # paper_path = "paper.txt"
    # with open(paper_path, "r", encoding="utf-8") as f:
    #     paper_text = f.read()


    # asyncio.run(insert_document(paper_text, docs_id="papers"))

    # Test query_rag with a sample query
    # sample_query = "What is PaddleOCR model and how does it work in this paper return?"
    # docs_id = "papers"
    # result = asyncio.run(query_rag(sample_query, docs_id, mode= "global"))
    # print("Query Result:", result)

    # Test get graph labels
    # docs_id = "papers"
    # labels = asyncio.run(get_graph_labels(docs_id))
    # print("Graph Labels:", labels)

    # Test export LightRAG data
    # rag = asyncio.run(  initialize_rag())

    # asyncio.run(rag.aexport_data(output_path=f"{WORKING_DIR}/exported_data"))

    print(hash_docs_id(["papers", "paper 2", "paper 3"]))

    



    

