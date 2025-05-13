from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
import azure.cognitiveservices.speech as speechsdk
import os
from dotenv import load_dotenv
import shutil

load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Azure Speech Services credentials
SUBSCRIPTION_KEY = os.getenv("AZURE_SPEECH_KEY")
REGION = os.getenv("AZURE_SPEECH_REGION")


def speech_to_text(audio_file_path: str) -> str:
    """
    Converts speech in an audio file to text using Azure Speech Services.

    Args:
        audio_file_path (str): Path to the audio file.

    Returns:
        str: Transcribed text from the audio file.
    """
    try:
        # Create a speech configuration object
        speech_config = speechsdk.SpeechConfig(subscription=SUBSCRIPTION_KEY, region=REGION)

        # Create an audio configuration object for the input file
        audio_config = speechsdk.audio.AudioConfig(filename=audio_file_path)

        # Create a speech recognizer
        speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

        # Perform speech recognition
        print("Recognizing speech...")
        result = speech_recognizer.recognize_once()

        # Check the result
        if result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print("Speech recognized successfully.")
            return result.text
        elif result.reason == speechsdk.ResultReason.NoMatch:
            print("No speech could be recognized.")
            return "No speech recognized."
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print(f"Speech recognition canceled: {cancellation_details.reason}")
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print(f"Error details: {cancellation_details.error_details}")
            return "Speech recognition canceled."
        else:
            return "Unknown error occurred during speech recognition."
    except Exception as e:
        print(f"Error during speech recognition: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    

def text_to_speech(text: str, output_file_path: str) -> str:
    """
    Converts text to speech using Azure Speech Services and saves it as an audio file.

    Args:
        text (str): The text to be converted to speech.
        output_file_path (str): The path where the audio file will be saved.

    Returns:
        str: A message indicating the success or failure of the operation.
    """
    try:
        # Create a speech configuration object
        speech_config = speechsdk.SpeechConfig(subscription=SUBSCRIPTION_KEY, region=REGION)

        # Set the voice for the speech synthesis (optional, defaults to a standard voice)
        speech_config.speech_synthesis_voice_name = "en-US-AriaNeural"  # Example: Neural voice

        # Create an audio configuration object for the output file
        audio_config = speechsdk.audio.AudioOutputConfig(filename=output_file_path)

        # Create a speech synthesizer
        speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

        # Perform text-to-speech synthesis
        print("Synthesizing speech...")
        result = speech_synthesizer.speak_text_async(text).get()

        # Check the result
        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print(f"Speech synthesized successfully and saved to {output_file_path}.")
            return f"Speech synthesized successfully and saved to {output_file_path}."
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print(f"Speech synthesis canceled: {cancellation_details.reason}")
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                print(f"Error details: {cancellation_details.error_details}")
            return "Speech synthesis canceled."
        else:
            return "Unknown error occurred during speech synthesis."
    except Exception as e:
        print(f"Error during speech synthesis: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    # Path to save the output audio file
    audio_file_path = "output_audio.wav"

    # Call the text_to_speech function
    transcript = speech_to_text(audio_file_path)
    print(transcript)