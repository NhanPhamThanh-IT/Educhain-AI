import asyncio
import logging
import os
import time
from dotenv import load_dotenv

from lightrag import LightRAG, QueryParam
from lightrag.llm.zhipu import zhipu_complete
from lightrag.llm.openai import openai_embed, gpt_4o_mini_complete
from lightrag.llm.ollama import ollama_embedding
from lightrag.utils import EmbeddingFunc
from lightrag.kg.shared_storage import initialize_pipeline_status

load_dotenv()
ROOT_DIR = os.getcwd()

#Create a working directory
if not os.path.exists(f"{ROOT_DIR}/papers-pg"):
    os.mkdir(f"{ROOT_DIR}/papers-pg")
    
WORKING_DIR = f"{ROOT_DIR}/papers-pg"

logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.DEBUG)

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

print(ROOT_DIR)
print(WORKING_DIR)

# AGE
# os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
# print(os.environ["OPENAI_API_KEY"])
# os.environ["AGE_GRAPH_NAME"] = os.getenv("AGE_GRAPH_NAME")

# os.environ["POSTGRES_HOST"] = os.getenv("POSTGRES_HOST")
# os.environ["POSTGRES_PORT"] = os.getenv("POSTGRES_PORT")
# os.environ["POSTGRES_USER"] = os.getenv("POSTGRES_USER")
# os.environ["POSTGRES_PASSWORD"] = os.getenv("POSTGRES_PASSWORD")
# os.environ["POSTGRES_DATABASE"] = os.getenv("POSTGRES_DATABASE")
# os.environ["POSTGRES_WORKSPACE"] = os.getenv("POSTGRES_WORKSPACE")

embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
)

async def initialize_rag():
    rag = LightRAG(
        course_name="papers",
        working_dir=WORKING_DIR,
        llm_model_func=gpt_4o_mini_complete,
        llm_model_name= "gpt-4o-mini",
        llm_model_max_async=4,
        llm_model_max_token_size=32768,
        enable_llm_cache_for_entity_extract=True,
        embedding_func= embedding_func,
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

    return rag


async def main():
    # Initialize RAG instance
    now = time.time()
    rag = await initialize_rag()

    # add embedding_func for graph database, it's deleted in commit 5661d76860436f7bf5aef2e50d9ee4a59660146c
    rag.chunk_entity_relation_graph.embedding_func = rag.embedding_func

    print(f"Time to initialize RAG: {time.time() - now} seconds")

    # with open(f"{ROOT_DIR}/paper.txt", "r", encoding="utf-8") as f:
    #     await rag.ainsert(f.read())

    # print("==== Trying to test the rag queries ====")
    # print("**** Start Naive Query ****")
    # start_time = time.time()
    # # Perform naive search
    # print(
    #     await rag.aquery(
    #         "Top 5 things need to read in this paper", param=QueryParam(mode="naive", only_need_context=False)
    #     )
    # )
    # print(f"Naive Query Time: {time.time() - start_time} seconds")
    # Perform local search
    # print("**** Start Local Query ****")
    # start_time = time.time()
    # print(
    #     await rag.aquery(
    #         "using the CLIP ViT-L/14 model, what author extracted", param=QueryParam(mode="local", only_need_context=False)
    #     )
    # )
    # print(f"Local Query Time: {time.time() - start_time} seconds")
    # Perform global search
    # print("**** Start Global Query ****")
    # start_time = time.time()
    # print(
    #     await rag.aquery(
    #         "How the performance of the system", param=QueryParam(mode="global", only_need_context=True)
    #     )
    # )
    # print(f"Global Query Time: {time.time() - start_time}")
    # Perform hybrid search
    # start_time = time.time()
    # print("**** Start Hybrid Query ****")
    # print(
    #     await rag.aquery(
    #         "Why they use the Jaro-winkler?", param=QueryParam(mode="hybrid")
    #     )
    # )
    # print(f"Hybrid Query Time: {time.time() - start_time} seconds")


if __name__ == "__main__":
    asyncio.run(main())