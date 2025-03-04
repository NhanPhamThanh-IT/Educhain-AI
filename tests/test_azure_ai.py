from azure.ai.documentintelligence import DocumentIntelligenceClient
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import ResourceExistsError 
import time

AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT = "https://educhain2.cognitiveservices.azure.com/"
AZURE_DOCUMENT_INTELLIGENCE_KEY = "8KpvDitYPgpWNDZwA0c4vZd8AVctIGXiQMFF2ezqCmh9jaTGMKu9JQQJ99BBACqBBLyXJ3w3AAALACOGe77M"

# Initialize the client
client = DocumentIntelligenceClient(AZURE_DOCUMENT_INTELLIGENCE_ENDPOINT, AzureKeyCredential(AZURE_DOCUMENT_INTELLIGENCE_KEY))

# PDF URL from Azure Blob Storage
pdf_url = "https://phamgiabao.blob.core.windows.net/pdfs/f10086dc-dbb3-4ac7-9a63-ca3c7a9d0bb2.pdf"

# Send the URL for text extraction
poller = client.begin_analyze_document("prebuilt-read", {"urlSource": pdf_url})
result = poller.result()

# Extract and print the text
extracted_text = "\n".join([line.content for page in result.pages for line in page.lines])

output_filename = "extracted_text.txt"
with open(output_filename, "w", encoding="utf-8") as file:
    file.write(extracted_text)


print(f"Extracted text saved to {output_filename}")
# print("Extracted Text:\n", extracted_text)
