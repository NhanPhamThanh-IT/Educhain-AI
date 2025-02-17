import os
from lightrag import LightRAG, QueryParam
from lightrag.llm.openai import gpt_4o_mini_complete
from lightrag.utils import EmbeddingFunc
from lightrag.llm.openai import openai_embed  # or your custom embedding


os.environ["NEO4J_URI"] = "neo4j+s://3aecad3c.databases.neo4j.io"
os.environ["NEO4J_USERNAME"] = "neo4j"
os.environ["NEO4J_PASSWORD"] = "0L_nAMZmeBpDiCYM24uCCfdulk_nEKFUHdBkgNfqlyY"
os.environ["OPENAI_API_KEY"] = "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"

#########
# Uncomment the below two lines if running in a jupyter notebook to handle the async nature of rag.insert()
# import nest_asyncio
# nest_asyncio.apply()
#########

WORKING_DIR = "./local_neo4jWorkDir"

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

Embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
)

rag = LightRAG(
    working_dir=WORKING_DIR,
    llm_model_func=gpt_4o_mini_complete,  # Use gpt_4o_mini_complete LLM model
    embedding_func= Embedding_func,
    chunk_token_size=512,
    chunk_overlap_token_size=256,
    graph_storage="Neo4JStorage",
    log_level="INFO",
    # llm_model_func=gpt_4o_complete  # Optionally, use a stronger model
)

# with open("book.txt","r" ,encoding="utf-8") as f:
#     rag.insert(f.read())

# # Perform naive search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="naive"))
# )

# # Perform local search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="local"))
# )

# # Perform global search
# print(
#     rag.query("What are the top themes in this story?", param=QueryParam(mode="global"))
# )

# Perform hybrid search
print(
    rag.query("What are the top themes in this story?", param=QueryParam(mode="hybrid"))
)