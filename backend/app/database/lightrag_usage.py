# Lightrag using 4 database for storing data:
    # - Neo4J - For storing the knowledge graph
    # - Milvus - For storing the embeddings
    # - Redis - For storing the key-value pairs and doc status
    # Note that for each user on website the system must store an ID for there lightrag data

import os
from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import gpt_4o_mini_complete, openai_complete_if_cache
from lightrag.utils import EmbeddingFunc
from lightrag.llm.openai import openai_embed  # or your custom embedding
from dotenv import load_dotenv
from utils.prompt.chat_prompt import get_chat_prompt

# traverse_knowledge_graph, get_quiz_questions, get_study_guide, get_exam_questions 

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USER")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")


WORKING_DIR = "./local_neo4jWorkDir"

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
)

# Use this for an agent chat with history messages and prompt 
# Change deepseek-chat to gpt-4o-mini if you want to use it
# Change the api_key to your own key
# Change the base_url to your own base_url
async def llm_model_func1(
    prompt, system_prompt=None, history_messages=[], keyword_extraction=False, **kwargs
) -> str:
    return await openai_complete_if_cache(
        "deepseek/deepseek-chat:free",
        prompt,
        system_prompt=system_prompt,
        history_messages=history_messages,
        api_key= OPENROUTER_API_KEY, 
        base_url="https://openrouter.ai/api/v1",
        **kwargs,
    )

llm_model_func2 = gpt_4o_mini_complete 

def lightrag_config():
    rag = LightRAG(
        working_dir=WORKING_DIR,
        llm_model_func= llm_model_func1,  # Use gpt_4o_mini_complete LLM model
        embedding_func= embedding_func,
        chunk_token_size=512,
        chunk_overlap_token_size=256,
        graph_storage="Neo4JStorage",
        log_level="DEBUG",
        # llm_model_func=gpt_4o_complete  # Optionally, use a stronger model
    )
    return rag


rag = lightrag_config()
prompt = "What are the top themes in this story?"

# When user asks a question, the system should perform a correct search using the LightRAG model.
# The search can be performed using different modes: naive, local, global, hybrid, and mix depends on user's question

def lightrag_naive_search(prompt):
    return rag.query(prompt, param=QueryParam(mode="naive"))

def lightrag_search_local(prompt):
    return rag.query(prompt, param=QueryParam(mode="local"))

def lightrag_search_global(prompt):
    return rag.query(prompt, param=QueryParam(mode="global"))

def lightrag_search_hybrid(prompt):
    return rag.query(prompt, param=QueryParam(mode="hybrid"))

def lightrag_search_mix(prompt):
    return rag.query(prompt, param=QueryParam(mode="mix"))

def lightrag_find(prompt):
    return rag.query(prompt)

def lightrag_insert(data):
    rag.insert(data)

def lightrag_update(data):
    rag.update(data) 


# Perform naive search, local search, global search, hybrid search, mix search
print(
    rag.query(prompt, param=QueryParam(mode="naive"))
)

# # Perform local search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="local"))
# )

# # Perform global search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="global"))
# )

# # Perform hybrid search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="hybrid"))
# )   