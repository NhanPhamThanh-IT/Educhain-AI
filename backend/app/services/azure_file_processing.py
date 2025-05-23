import os
import tempfile
from typing import Optional
from fastapi import UploadFile
from azure.core.credentials import AzureKeyCredential
from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.ai.documentintelligence.models import AnalyzeResult

from app.utils.lightrag_functions import insert_document
from app.utils.hashing import hash_course_name

endpoint = os.environ.get("AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT")
key = os.environ.get("AZURE_DOCUMENT_INTELLIGENCE_KEY")
    

async def process_pdf_file(file: UploadFile, course_name: str) -> bool:
    """
    Process a PDF file using Azure Document Intelligence and store extracted text in the database.
    
    Args:
        file: The uploaded PDF file
        course_name: The name of the course this document belongs to
        
    Returns:
        bool: True if processing and storage was successful, False otherwise
    """
    try:
        # Get Azure credentials from environment variables
        if not endpoint or not key:
            raise ValueError("Azure Document Intelligence credentials not found in environment variables")
        
        # Create Azure Document Intelligence client
        document_intelligence_client = DocumentIntelligenceClient(
            endpoint=endpoint,
            credential=AzureKeyCredential(key)
        )
        
        # Save the uploaded file to a temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file_path = temp_file.name
            content = await file.read()
            temp_file.write(content)
        
        try:
            # Analyze the document using Azure Document Intelligence
            with open(temp_file_path, "rb") as f:
                document_content = f.read()
                
            # Fixed method call with required 'body' parameter
            poller = document_intelligence_client.begin_analyze_document(
                "prebuilt-layout", 
                body=document_content
            )
                
            # Get analysis results
            result = poller.result()
            
            # Extract text content from result
            document_text = ""
            for page in result.pages:
                for line in page.lines:
                    document_text += line.content + "\n"
            
            # Insert document text into database
            course_name = hash_course_name(course_name)
            success = await insert_document(document_text, course_name)
            
            return success
            
        finally:
            # Clean up the temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
                
    except Exception as e:
        print(f"Error processing PDF file: {str(e)}")
        return False