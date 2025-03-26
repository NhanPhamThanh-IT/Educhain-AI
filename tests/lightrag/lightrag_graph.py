import os
import asyncio
from lightrag.kg.postgres_impl import PGGraphStorage
from lightrag.llm.openai import openai_embed
from lightrag.llm.ollama import ollama_embedding
from lightrag.utils import EmbeddingFunc
from dotenv import load_dotenv
import logging

#########
# Uncomment the below two lines if running in a jupyter notebook to handle the async nature of rag.insert()
# import nest_asyncio
# nest_asyncio.apply()
#########

load_dotenv()
ROOT_DIR = os.getcwd()

#Create a working directory
if not os.path.exists(f"{ROOT_DIR}/papers-pg"):
    os.mkdir(f"{ROOT_DIR}/papers-pg")
    
WORKING_DIR = f"{ROOT_DIR}/papers-pg"

logging.basicConfig(format="%(levelname)s:%(message)s", level=logging.INFO)

if not os.path.exists(WORKING_DIR):
    os.mkdir(WORKING_DIR)

# AGE
os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["AGE_GRAPH_NAME"] = os.getenv("AGE_GRAPH_NAME")

os.environ["POSTGRES_HOST"] = os.getenv("POSTGRES_HOST")
os.environ["POSTGRES_PORT"] = os.getenv("POSTGRES_PORT")
os.environ["POSTGRES_USER"] = os.getenv("POSTGRES_USER")
os.environ["POSTGRES_PASSWORD"] = os.getenv("POSTGRES_PASSWORD")
os.environ["POSTGRES_DATABASE"] = os.getenv("POSTGRES_DATABASE")


embedding_func = EmbeddingFunc(
        embedding_dim=1536,
        max_token_size=8192,
        func=lambda texts: openai_embed(texts, model="text-embedding-3-small")
)


async def main():
    graph_db = PGGraphStorage(
        namespace="papers",
        embedding_func=embedding_func,
        global_config={},
    )

    await graph_db.initialize()
    labels = await graph_db.get_all_labels()
    print("all labels", labels)

    # res = await graph_db.get_knowledge_graph("FEZZIWIG")
    # print("knowledge graphs", res)

    await graph_db.finalize()


if __name__ == "__main__":
    asyncio.run(main())