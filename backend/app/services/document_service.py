from azure.storage.blob import BlobServiceClient
from azure.ai.formrecognizer import DocumentAnalysisClient
from azure.core.credentials import AzureKeyCredential
import os
from dotenv import load_dotenv

load_dotenv()

# Load Azure Blob Storage connection string and Form Recognizer credentials from environment variables
AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = os.getenv("AZURE_CONTAINER_NAME")
FORM_RECOGNIZER_ENDPOINT = os.getenv("FORM_RECOGNIZER_ENDPOINT")
FORM_RECOGNIZER_KEY = os.getenv("FORM_RECOGNIZER_KEY")

blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)
document_analysis_client = DocumentAnalysisClient(endpoint=FORM_RECOGNIZER_ENDPOINT, credential=AzureKeyCredential(FORM_RECOGNIZER_KEY))

def download_blob(blob_name):
    try:
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)
        download_stream = blob_client.download_blob()
        return download_stream.readall()
    except Exception as e:
        return {"error": str(e)}

def upload_blob(file_content, blob_name):
    try:
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=blob_name)
        blob_client.upload_blob(file_content, overwrite=True)
        return {"filename": blob_name, "message": "File uploaded successfully"}
    except Exception as e:
        return {"error": str(e)}

def process_pdf_with_form_recognizer(pdf_content):
    try:
        poller = document_analysis_client.begin_analyze_document("prebuilt-document", pdf_content)
        result = poller.result()
        text_content = ""
        for page in result.pages:
            for line in page.lines:
                text_content += line.content + "\n"
        return text_content
    except Exception as e:
        return {"error": str(e)}

def process_and_upload_pdf(blob_name):
    pdf_content = download_blob(blob_name)
    if isinstance(pdf_content, dict) and "error" in pdf_content:
        return pdf_content

    text_content = process_pdf_with_form_recognizer(pdf_content)
    if isinstance(text_content, dict) and "error" in text_content:
        return text_content

    text_blob_name = blob_name.replace(".pdf", ".txt")
    result = upload_blob(text_content, text_blob_name)
    return result