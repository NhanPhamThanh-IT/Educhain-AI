from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import ResourceExistsError 
import os
import uuid
import logging

# Load Azure connection string from environment variable
AZURE_CONNECTION_STRING = os.getenv("AZURE_CONNECTION_STRING")
if not AZURE_CONNECTION_STRING:
    raise ValueError("AZURE_CONNECTION_STRING environment variable is not set")

blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)

async def upload_to_blob(file, ext):
    if ext in [".pdf", ".docx", ".pptx", ".xlsx", ".txt", ".csv"]:
        container_name = "pdfs"
    elif ext in [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"]:
        container_name = "images"
    elif ext in [".mp4", ".avi", ".mov", ".mkv", ".flv"]:
        container_name = "videos"
    else:
        return {"error": "Invalid file type"}, 400

    container_client = blob_service_client.get_container_client(container_name)
    try:
        await container_client.create_container()
    except ResourceExistsError:
        logging.info(f"Container '{container_name}' already exists.")
    except Exception as e:
        logging.warning(f"Container creation failed: {e}")

    unique_filename = f"{uuid.uuid4()}{ext}"
    blob_client = container_client.get_blob_client(unique_filename)
    file_data = await file.read()
    await blob_client.upload_blob(file_data)

    return {"url": blob_client.url}, 200, ext



