import asyncio
from crawl4ai import *
import os
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time




async def main():
    options = Options()
    options.add_argument('--headless')  
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    driver = webdriver.Chrome(options=options)

    url = "https://dsdaihoc.com/"  
    driver.get(url)
    time.sleep(10)  # Đợi js load

    rendered_html = driver.page_source
    driver.quit()

    # Create render

    with open("rendered_page.html", "w", encoding="utf-8") as f:
        f.write(rendered_html)


    # async with AsyncWebCrawler() as crawler:
    #     # result = await crawler.arun(
    #     #     url="https://dsdaihoc.com", 
    #     # )
    #     # print(result.markdown)

    #     # Crawl4AI with rendered HTML
    #     result = await crawler.arun(
    #         url="https://dsdaihoc.com",
    #         rendered_html=rendered_html,
    #         # rendered_html_path="rendered_page.html"
    #     )

    # #     if not os.path.exists("crawl_result2.md"):
    # #         os.makedirs("crawl_result2.md")

    #     with open("crawl_result.md", "w", encoding="utf-8") as f:
    #         f.write(result.markdown)

if __name__ == "__main__":
    asyncio.run(main())


