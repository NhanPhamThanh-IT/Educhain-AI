from azure.storage.blob import BlobServiceClient
import os
from dotenv import load_dotenv
from azure.core.exceptions import ResourceNotFoundError

load_dotenv()  # Load from .env file
connection_string = os.getenv("AZURE_STORAGE_CONNECTION_STRING")

blob_service_client = BlobServiceClient.from_connection_string(connection_string)
print("Connected successfully!")


def container_exists(container_name):
    try:
        # Get container client
        container_client = blob_service_client.get_container_client(container_name)
        # Attempt to get container properties (this will fail if it doesn’t exist)
        container_client.get_container_properties()
        return True
    except ResourceNotFoundError:
        return False
    except Exception as e:
        print(f"Error checking container {container_name}: {e}")
        return False