import asyncio
import logging
import os
import time
from dotenv import load_dotenv

from lightrag import LightRAG, QueryParam
from lightrag.llm.zhipu import zhipu_complete
from lightrag.llm.ollama import ollama_embedding
from lightrag.llm.openai import openai_embed, gpt_4o_mini_complete
from lightrag.utils import EmbeddingFunc

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
os.environ["COSINE_THRESHOLD"] = '0.1'
# os.environ["POSTGRES_WORKSPACE"] = course_id
# 


embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
)

async def main():

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
        namespace_prefix="graphtest"
    )
    
    # add embedding_func for graph database, it's deleted in commit 5661d76860436f7bf5aef2e50d9ee4a59660146c
    rag.chunk_entity_relation_graph.embedding_func = rag.embedding_func
    await rag.initialize_storages()

    # print(f"Init time: {time.time() - start_time} seconds")   

    # with open(f"{WORKING_DIR}/book.txt", "r", encoding="utf-8") as f:
    #     await rag.ainsert(f.read())

    # print("==== Trying to test the rag queries ====")
    # print("**** Start Naive Query ****")
    # start_time = time.time()
    # Perform naive search
    # print(
    #     await rag.aquery(
    #         "What are the top themes in the story", param=QueryParam(mode="naive", only_need_context=True)
    #     )
    # )
    # print(f"Naive Query Time: {time.time() - start_time} seconds")

    # Perform local search
    # print("**** Start Local Query ****")
    # start_time = time.time()
    print(
        await rag.aquery(
            "What are the top themes in this story?", param=QueryParam(mode="local", top_k=15, only_need_context=True) 
        )
    )
    # print(f"Local Query Time: {time.time() - start_time} seconds")

    # Perform global search
    # print("**** Start Global Query ****")
    # start_time = time.time()
    # print(
    #     await rag.aquery(
    #         "What are the top themes in this story?", param=QueryParam(mode="global", top_k = 20)
    #     )
    # )
    # print(f"Global Query Time: {time.time() - start_time}")
    # Perform hybrid search
    # print("**** Start mix Query ****")
    # print(
    #     await rag.aquery(
    #         "What are the top themes in this story?", param=QueryParam(mode="mix")
    #     )
    # )
    # print(f"mix Query Time: {time.time() - start_time} seconds")


if __name__ == "__main__":
    asyncio.run(main())