from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from azure.storage.blob import BlobServiceClient
from azure.core.exceptions import ResourceExistsError 
import os
import uuid
import logging

app = FastAPI()

# Enable CORS to allow requests from your frontend (http://127.0.0.1:5500)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Only allow requests from this frontend
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Load Azure connection string from environment variable
AZURE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=phamgiabao;AccountKey=GcJH1mNtqKLC+qwDl/WiWJ46xwVraXka2GcRFUnOcv0lsTgnWRvdG41y1hqfKxuihig4EOind+y7+AStVI3TnA==;EndpointSuffix=core.windows.net"

if not AZURE_CONNECTION_STRING:
    raise ValueError("AZURE_CONNECTION_STRING environment variable is not set")

blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)

        if ext in [".pdf", ".docx", ".pptx", ".xlsx", ".txt", ".csv"]:
            container_name = "pdfs"
        elif ext in [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".webp"]:
            container_name = "images"
        elif ext in [".mp4", ".avi", ".mov", ".mkv", ".flv"]:
            container_name = "videos"
        else:
            return JSONResponse(content={"error": "Invalid file type"}, status_code=400)
    
        container_client = blob_service_client.get_container_client(container_name)
        
        try:
            await container_client.create_container()
        # except ResourceExistsError:
        #     logging.info(f"Container '{container_name}' already exists.") 
        except Exception as e:
            logging.warning(f"Container creation failed: {e}")
        
        unique_filename = f"{uuid.uuid4()}{ext}"

        blob_client = container_client.get_blob_client(unique_filename)
        file_data = await file.read()
        blob_client.upload_blob(file_data)

        blob_url = blob_client.url
        return JSONResponse(content={"url": blob_url})
    except Exception as e:
        logging.error(f"File upload failed: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
    