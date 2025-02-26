from azure.storage.blob import BlobServiceClient
import os
from dotenv import load_dotenv

load_dotenv()

# Load Azure Blob Storage connection string from environment variables
AZURE_STORAGE_CONNECTION_STRING = os.getenv("AZURE_STORAGE_CONNECTION_STRING")
CONTAINER_NAME = os.getenv("AZURE_CONTAINER_NAME")

blob_service_client = BlobServiceClient.from_connection_string(AZURE_STORAGE_CONNECTION_STRING)

def upload_file_to_blob(file, filename):
    try:
        # Create a blob client using the local file name as the name for the blob
        blob_client = blob_service_client.get_blob_client(container=CONTAINER_NAME, blob=filename)

        # Upload the file to Azure Blob Storage
        blob_client.upload_blob(file.read(), overwrite=True)

        return {"filename": filename, "message": "File uploaded successfully"}
    except Exception as e:
        return {"error": str(e)}