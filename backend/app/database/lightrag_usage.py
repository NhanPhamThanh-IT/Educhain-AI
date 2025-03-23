import asyncio
import logging
import os
import time
from dotenv import load_dotenv
import logging


from lightrag import LightRAG, QueryParam
from lightrag.llm.zhipu import zhipu_complete
from lightrag.llm.ollama import ollama_embedding
from lightrag.llm.openai import openai_embed, gpt_4o_mini_complete
from lightrag.utils import EmbeddingFunc
from prompt.commands.multiple_choice import multiple_choice_command

load_dotenv()

WORKING_DIR  = "./lightrag_storage"

logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.INFO)

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

# AGE


os.environ["OPENAI_API_KEY"] = "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"
# os.environ["AGE_GRAPH_NAME"] = "dickens"

os.environ["POSTGRES_HOST"] = "educhain3.postgres.database.azure.com"
os.environ["POSTGRES_PORT"] = "5432"
os.environ["POSTGRES_USER"] = "admintu"
os.environ["POSTGRES_PASSWORD"] = "educhain123@"
os.environ["POSTGRES_DATABASE"] = "postgres"   
os.environ["COSINE_THRESHOLD"] = '0.25'
# os.environ["POSTGRES_WORKSPACE"] = "default"
# 


    # add embedding_func for graph database, it's deleted in commit 5661d76860436f7bf5aef2e50d9ee4a59660146c
async def lightRAG_init():
    embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
    )

    rag = LightRAG(
        working_dir=WORKING_DIR,
        llm_model_func= gpt_4o_mini_complete,
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
        # namespace_prefix="iukm2025"
    )

    rag.chunk_entity_relation_graph.embedding_func = rag.embedding_func
    await rag.initialize_storages()

    return rag


rag = lightRAG_init() # in production scenerio, this will be fix into parse workplace

async def lr_insert_knowledge(content: str):
    # with open(f"{WORKING_DIR}/extracted_text.txt", "r", encoding="utf-8") as f:
        await rag.ainsert(content)

async def lr_naive_query(query: str):
    return await rag.aquery(query, param=QueryParam(mode="naive", only_need_context=True))

async def lr_local_query(query: str):  
    return await rag.aquery(query, param=QueryParam(mode="local", only_need_context=True))

async def lr_create_quiz(topic: str):
    prompt = multiple_choice_command(topic)
    return await rag.aquery(prompt, param=QueryParam(mode="local"))

# async def main():
    # print(f"Init time: {time.time() - start_time} seconds")   


    # print("==== Trying to test the rag queries ====")
    # print("**** Start Naive Query ****")
    # start_time = time.time()
    # Perform naive search
    # print(
    #     await rag.aquery(
    #         "What FAISS do in this system?", param=QueryParam(mode="naive")
    #     )
    # )
    # print(f"Naive Query Time: {time.time() - start_time} seconds")

    # Perform local search
    # print("**** Start Local Query ****")
    # start_time = time.time()
    # print(
    #     await rag.aquery(
    #         "List me in detail highlights of this article ?", param=QueryParam(mode="local") 
    #     )
    # )
    # # print(f"Local Query Time: {time.time() - start_time} seconds")

    # Perform global search
    # print("**** Start Global Query ****")
    # start_time = time.time()
    # print(
    #     await rag.aquery(
    #         "What the relationship between CLIP and FAISS?", param=QueryParam(mode="global")
    #     )
    # )
    # print(f"Global Query Time: {time.time() - start_time}")
    # Perform hybrid search
    # print("**** Start mix Query ****")
    # print(
    #     await rag.aquery(
    #         "So where the system has been tested?", param=QueryParam(mode="mix")
    #     )
    # )
    # print(f"mix Query Time: {time.time() - start_time} seconds")


# if __name__ == "__main__":
#     asyncio.run(main())