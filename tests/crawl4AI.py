import asyncio
from crawl4ai import *

async def main():
    async with AsyncWebCrawler() as crawler:
        result = await crawler.arun(
            url="https://machinelearningcoban.com/2017/03/04/overfitting/", 
        )
        # print(result.markdown)

        with open("crawl_result.md", "w", encoding="utf-8") as f:
            f.write(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())


