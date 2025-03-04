from fastapi import APIRouter
from app.services.document_service import process_and_upload_pdf

router = APIRouter()

@router.post("/process-pdf/")
async def process_pdf(blob_name: str):
    result = process_and_upload_pdf(blob_name)
    return result
