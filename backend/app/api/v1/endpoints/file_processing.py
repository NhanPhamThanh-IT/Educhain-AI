from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from typing import Dict, Any
from pydantic import BaseModel

from app.services.azure_file_processing import process_pdf_file
from app.services.blob_storage_service import upload_to_blob

router = APIRouter()

class FileProcessingResponse(BaseModel):
    success: bool
    message: str

@router.post("/process-pdf", response_model=FileProcessingResponse)
async def upload_and_process_pdf(
    file: UploadFile = File(...),
    course_name: str = Form(...)
):
    """
    Upload a PDF file and process it with Azure Document Intelligence.
    
    The file is analyzed using Azure Document Intelligence to extract text content,
    which is then stored in the database associated with the provided course name.
    
    Args:
        file: The PDF file to process
        course_name: The course name to associate with the document 
    
    Returns:
        JSON response indicating success or failure
    """
    # Validate file type
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are supported"
        )
        
    try:
        # Process the file using the service
        print("start processing")
        success = await process_pdf_file(file, course_name)
        
        if success:
            # Upload the file to Azure Blob Storage
            return FileProcessingResponse(
                success=True,
                message=f"Document '{file.filename}' successfully processed and stored for course '{course_name}'"
            )
        else:
            return FileProcessingResponse(
                success=False,
                message="Failed to process the document"
            )
    
    except ValueError as e:
        # Handle validation errors
        raise HTTPException(
            status_code=400,
            detail=str(e)
        )
    
    except Exception as e:
        # Handle other errors
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the document: {str(e)}"
        )

@router.post("/process-multiple-pdfs", response_model=Dict[str, Any])
async def upload_and_process_multiple_pdfs(
    files: list[UploadFile] = File(...),
    course_name: str = Form(...)
):  
    """
    Upload and process multiple PDF files at once.
    
    Each file is analyzed using Azure Document Intelligence to extract text content,
    which is then stored in the database associated with the provided course name.
    
    Args:
        files: List of PDF files to process
        course_name: The course name to associate with all documents
    
    Returns:
        JSON response with results for each file
    """
    if not files:
        raise HTTPException(
            status_code=400,
            detail="No files provided"
        )
    
    results = {}
    
    for file in files:
        # Validate file type
        if not file.filename.lower().endswith('.pdf'):
            results[file.filename] = {
                "success": False,
                "message": "Not a PDF file - skipped"
            }
            continue
        
        try:
            # Process the file using the service
            success = await process_pdf_file(file, course_name)
            
            if success:
                results[file.filename] = {
                    "success": True,
                    "message": "Successfully processed"
                }
            else:
                results[file.filename] = {
                    "success": False,
                    "message": "Processing failed"
                }
                
        except Exception as e:
            results[file.filename] = {
                "success": False,
                "message": f"Error: {str(e)}"
            }
    
    # Return summary with individual file results
    return {
        "overall_success": any(result["success"] for result in results.values()),
        "total_files": len(files),
        "successful_files": sum(1 for result in results.values() if result["success"]),
        "course_name": course_name,
        "file_results": results
    }