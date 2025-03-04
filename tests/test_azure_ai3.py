import requests
import io
import pdfplumber
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.core.credentials import AzureKeyCredential
from PIL import Image

# 🔹 Cấu hình Azure Document Intelligence
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT = "https://educhain2.cognitiveservices.azure.com/"
AZURE_DOCUMENT_INTELLIGENCE_KEY = "8KpvDitYPgpWNDZwA0c4vZd8AVctIGXiQMFF2ezqCmh9jaTGMKu9JQQJ99BBACqBBLyXJ3w3AAALACOGe77M"

# 🔹 PDF URL từ Azure Blob Storage
pdf_url = "https://phamgiabao.blob.core.windows.net/pdfs/f10086dc-dbb3-4ac7-9a63-ca3c7a9d0bb2.pdf"

# 🔹 Khởi tạo Azure Document Intelligence Client
client = DocumentIntelligenceClient(AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT, AzureKeyCredential(AZURE_DOCUMENT_INTELLIGENCE_KEY))

# 🔹 Phân tích PDF bằng model `prebuilt-layout`
poller = client.begin_analyze_document("prebuilt-layout", {"urlSource": pdf_url})
result = poller.result()

# 🔹 Tải PDF vào bộ nhớ
response = requests.get(pdf_url)
pdf_bytes = io.BytesIO(response.content)

# 🔹 Mở PDF bằng pdfplumber
images_extracted = []
with pdfplumber.open(pdf_bytes) as pdf:
    for page_idx, page in enumerate(result.pages):
        # Lấy danh sách ảnh trong trang
        for element in page.selection_marks:
            if element.kind == "image":
                bbox = element.bounding_box  # (x_min, y_min, x_max, y_max)
                
                # Mở trang PDF
                pdf_page = pdf.pages[page_idx]

                # Cắt ảnh theo bounding box
                img = pdf_page.to_image()
                cropped_img = img.crop((bbox[0], bbox[1], bbox[2], bbox[3]))  # Crop theo tọa độ
                image_filename = f"page_{page_idx + 1}_image.png"
                
                # Lưu ảnh ra file
                cropped_img.save(image_filename)
                images_extracted.append(image_filename)

                print(f"🖼 Ảnh đã lưu: {image_filename}")

# 🔹 Kết quả
if images_extracted:
    print("✅ Tất cả ảnh đã được tải xuống!")
else:
    print("❌ Không tìm thấy ảnh trong PDF.")
