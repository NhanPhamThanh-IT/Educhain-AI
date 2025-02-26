from fastapi import APIRouter, File, UploadFile
from app.services.blob_storage_service import upload_file_to_blob

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    result = upload_file_to_blob(file.file, file.filename)
    return result