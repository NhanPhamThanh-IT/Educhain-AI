import fitz  # PyMuPDF
import requests
import io
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.core.credentials import AzureKeyCredential
from azure.storage.blob import BlobServiceClient

# 🔹 Thông tin kết nối Azure Document Intelligence
AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT = "https://educhain2.cognitiveservices.azure.com/"
AZURE_DOCUMENT_INTELLIGENCE_KEY = "8KpvDitYPgpWNDZwA0c4vZd8AVctIGXiQMFF2ezqCmh9jaTGMKu9JQQJ99BBACqBBLyXJ3w3AAALACOGe77M"

# 🔹 Thông tin kết nối Azure Blob Storage
AZURE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=phamgiabao;AccountKey=GcJH1mNtqKLC+qwDl/WiWJ46xwVraXka2GcRFUnOcv0lsTgnWRvdG41y1hqfKxuihig4EOind+y7+AStVI3TnA==;EndpointSuffix=core.windows.net"
CONTAINER_NAME = "images"

# 🔹 PDF từ Azure Blob Storage (trực tiếp từ URL)
pdf_url = "https://phamgiabao.blob.core.windows.net/pdfs/f10086dc-dbb3-4ac7-9a63-ca3c7a9d0bb2.pdf"

# 🔹 Tải PDF từ URL vào bộ nhớ (không lưu file)
response = requests.get(pdf_url)
pdf_bytes = io.BytesIO(response.content)

# 🔹 Mở PDF bằng PyMuPDF từ bộ nhớ
doc = fitz.open("pdf", pdf_bytes)

# 🔹 Khởi tạo Azure Document Intelligence Client
client = DocumentIntelligenceClient(AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT, AzureKeyCredential(AZURE_DOCUMENT_INTELLIGENCE_KEY))
blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)

# 🔹 Gửi yêu cầu trích xuất văn bản từ PDF
# poller = client.begin_analyze_document("prebuilt-read", {"urlSource": pdf_url})
# result = poller.result()

# # 🔹 Trích xuất văn bản từ tài liệu
# extracted_text = "\n".join([line.content for page in result.pages for line in page.lines])

# # 🔹 Lưu văn bản thành file `.txt`
# text_filename = "extracted_text.txt"
# with open(text_filename, "w", encoding="utf-8") as file:
#     file.write(extracted_text)

# print(f"📄 Extracted text saved to {text_filename}")

# 🔹 Trích xuất ảnh trực tiếp từ PDF trong bộ nhớ
for page_num in range(len(doc)):
    page = doc[page_num]
    
    for img_index, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]

        # Lưu ảnh ra tệp (nếu cần)
        image_filename = f"page_{page_num + 1}_img_{img_index + 1}.{image_ext}"
        with open(image_filename, "wb") as img_file:
            img_file.write(image_bytes)

        print(f"Image saved: {image_filename}")

        # 🔹 Upload ảnh lên Azure Blob Storage
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=image_filename)
        with open(image_filename, "rb") as data:
            blob_client.upload_blob(data, overwrite=True)

        print(f"🚀 Image uploaded to Blob Storage: {blob_client.url}")
