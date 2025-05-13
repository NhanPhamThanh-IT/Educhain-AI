from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import time
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Khởi động Chrome

# options = Options()
# options.add_argument('--headless')  
# options.add_argument('--no-sandbox')
# options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=Options())
driver.get("https://dsdaihoc.com")  
time.sleep(5)  # Đợi js load


# for i in range(1, 10):  # Từ trang 1 đến 9
#     try:
#         pagination_buttons = driver.find_elements(By.XPATH, f'//button[text()="{i}"]')

#         for btn in pagination_buttons:
#             if btn.text.strip() == str(i):
#                 btn.click()
#                 time.sleep(5)  # Chờ trang load lại sau khi click
#                 print(f"Đang xử lý trang {i}...")

#                 # Lưu HTML 
#                 html = driver.page_source
#                 with open(f"page_{i}.html", "w", encoding="utf-8") as f:
#                     f.write(html)

#                 break
#     except Exception as e:
#         print(f"Lỗi ở trang {i}: {e}")

previous_html = ""  # Để kiểm tra thay đổi nội dung

for i in range(1, 10):
    try:
        print(f"➡️  Đang chuyển tới trang {i}...")
        button = driver.find_element(By.XPATH, f'//button[text()="{i}"]')

        # Cuộn tới nút và click bằng JS để tránh bị chặn
        driver.execute_script("arguments[0].scrollIntoView(true);", button)
        time.sleep(1)
        driver.execute_script("arguments[0].click();", button)

        time.sleep(4)  # Đợi trang load lại sau click

        # Kiểm tra xem DOM có thay đổi không
        html = driver.page_source
        if html == previous_html:
            print(f"DOM không thay đổi sau khi click trang {i}, thử lại...")
            time.sleep(3)
            html = driver.page_source

        # Lưu file HTML
        with open(f"page_{i}.html", "w", encoding="utf-8") as f:
            f.write(html)
    
        print(f"Đã lưu trang {i}")
        previous_html = html  # Cập nhật để so sánh cho lần sau

    except Exception as e:
        print(f" Lỗi ở trang {i}: {e}")

driver.quit()