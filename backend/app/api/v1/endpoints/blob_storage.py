from fastapi import APIRouter, File, UploadFile, Form  # <-- Add Form
from app.services.blob_storage_service import upload_to_blob
from fastapi.responses import JSONResponse
import os
import logging

router = APIRouter()

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...),
    course_id: str = Form(..., description="Course ID")  # <-- Use Form here
):
    try:
        file_name, ext = os.path.splitext(file.filename)
        res, status_code = await upload_to_blob(file, course_id, ext)        
        return JSONResponse(result=res["doc"], status_code=status_code)
    except Exception as e:
        logging.error(f"File upload failed: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

    
# @router.get("/download/")
# async def download_file(course_id: str, section: str, folder: str, file_name: str):
#     try:
#         response, status_code = await download_from_blob(course_id, section, folder, file_name)
#         return JSONResponse(content=response, status_code=status_code)
#     except Exception as e:
#         logging.error(f"File download failed: {e}")
#         return JSONResponse(content={"error": str(e)}, status_code=500)