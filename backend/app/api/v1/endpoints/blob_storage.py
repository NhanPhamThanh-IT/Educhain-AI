from fastapi import APIRouter, File, UploadFile
from backend.app.services.blob_storage_service import upload_to_blob
from fastapi.responses import JSONResponse
import os
import logging

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    try:
        _, ext = os.path.splitext(file.filename)
        response, status_code = await upload_to_blob(file, ext)
        return JSONResponse(content=response, status_code=status_code)
    except Exception as e:
        logging.error(f"File upload failed: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)