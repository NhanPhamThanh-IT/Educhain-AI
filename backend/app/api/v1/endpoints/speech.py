from backend.app.services.speech_service import speech_to_text
from fastapi import FastAPI, APIRouter,  HTTPException, UploadFile, File
from pydantic import BaseModel
import azure.cognitiveservices.speech as speechsdk
import os
from dotenv import load_dotenv
import shutil


router = APIRouter()

class SpeechToTextResponse(BaseModel):
    success: bool
    message: str
    text: str


@router.post("/speech-to-text/")
async def handle_speech_to_text(file: UploadFile = File(...)):
    """
    API endpoint to convert speech to text from an uploaded audio file.

    Args:
        file (UploadFile): The uploaded audio file.

    Returns:
        dict: Transcribed text or error message.
    """
    try:
        # Save the uploaded file temporarily
        temp_file_path = f"temp_{file.filename}"
        with open(temp_file_path, "wb") as temp_file:
            shutil.copyfileobj(file.file, temp_file)

        # Perform speech-to-text
        transcription = speech_to_text(temp_file_path)

        # Remove the temporary file
        os.remove(temp_file_path)

        return {"transcription": transcription}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

