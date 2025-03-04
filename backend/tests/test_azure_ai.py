import os
import time
import requests
import json

# Azure Document Intelligence details
AZURE_ENDPOINT = "      "
API_KEY = "8KpvDitYPgpWNDZwA0c4vZd8AVctIGXiQMFF2ezqCmh9jaTGMKu9JQQJ99BBACqBBLyXJ3w3AAALACOGe77M"
MODEL_ID = "prebuilt-layout"  # Change based on the model you need

# File to upload
FILE_PATH = "document3.pdf"  # Change to your file path

def upload_and_extract(file_path):
    url = f"{AZURE_ENDPOINT}formrecognizer/documentModels/{MODEL_ID}:analyze?api-version=2023-07-31"
    headers = {
        "Ocp-Apim-Subscription-Key": API_KEY,
        "Content-Type": "application/pdf"
    }

    with open(file_path, "rb") as f:
        response = requests.post(url, headers=headers, data=f)

    if response.status_code != 202:
        print("Error:", response.json())
        return None

    operation_url = response.headers["Operation-Location"]
    return operation_url

def get_results(operation_url):
    headers = {"Ocp-Apim-Subscription-Key": API_KEY}
    
    while True:
        response = requests.get(operation_url, headers=headers)
        result = response.json()
        
        if result["status"] == "succeeded":
            return result
        elif result["status"] == "failed":
            print("Extraction failed:", result)
            return None
        
        time.sleep(5)  # Wait before retrying

def save_results(results, output_path="output.json"):
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=4, ensure_ascii=False)
    print(f"Results saved to {output_path}")

if __name__ == "__main__":
    operation_url = upload_and_extract(FILE_PATH)
    
    if operation_url:
        print("Processing document... Please wait.")
        results = get_results(operation_url)
        
        if results:
            save_results(results)
