from azure.storage.blob import BlobServiceClient
import os, io
from dotenv import load_dotenv
from azure.core.exceptions import ResourceNotFoundError
from utils.blob_storage_utils import container_exists, blob_service_client  

# Create a container for the course 
def create_course_container(course_id):
    if (container_exists(course_id)):
        print(f"Container {course_id} already exists")
        return
    container_client = blob_service_client.get_container_client(course_id)
    container_client.create_container()

# Upload files to the container 
def upload_file(course_id, section, local_path):
    if container_exists(course_id) == False:
        create_course_container(course_id)
        
    # Extract file name from local_path
    file_name = os.path.basename(local_path)
    
    # Extract file extension
    file_extension = os.path.splitext(file_name)[1]
    
    # Category for the file
    category = "video" if file_extension in [".mp4", ".mov", ".avi"] else "image" if file_extension in [".jpg", ".jpeg", ".png", ".gif"] else "pdf" if file_extension in [".pdf"] else "txt"
    
    # Create blob client with the extracted file name
    blob_client = blob_service_client.get_blob_client(
        container=course_id,
        blob=f"{section}/{category}/{file_name}"
    )
    
    # Upload the file
    with open(local_path, "rb") as data:
        blob_client.upload_blob(data, overwrite=True)
    print(f"Uploaded {file_name} to {course_id}/{section}/{category} from local file")

'''
example using: upload_from_local(course_id, "userupload", "video folder", "local/videos/lecture.mp4")
- section: userupload/processed 
- folder: video folder/image folder/pdf folder
- file_name: lecture.mp4
- local_path: local/videos/lecture.mp4 - still redundant here
'''

# Download files from the container 
def download_file(course_id, section, folder, file_name):
    # Get the user's Downloads folder
    downloads_dir = os.path.join(os.path.expanduser("~"), "Downloads")
    os.makedirs(downloads_dir, exist_ok=True)

    # Full blob name in Azure
    blob_name = f"{section}/{folder}/{file_name}"
    blob_client = blob_service_client.get_blob_client(container=course_id, blob=blob_name)

    # Local file path
    local_file_path = os.path.join(downloads_dir, file_name)

    # Download the file
    try:
        with open(local_file_path, "wb") as file:
            blob_data = blob_client.download_blob()
            file.write(blob_data.readall())
        print(f"Downloaded {blob_name} to {local_file_path}")
    except Exception as e:
        print(f"Error downloading {blob_name}: {e}")
        
'''
- example using: download_file(course_id, "userupload", "video folder", "lecture.mp4")
'''

# Function to delete a file from Blob Storage
def delete_file(course_id, section, folder, file_name):
    # Full blob name in Azure
    blob_name = f"{section}/{folder}/{file_name}"
    blob_client = blob_service_client.get_blob_client(container=course_id, blob=blob_name)

    # Delete the file
    try:
        blob_client.delete_blob()
        print(f"Deleted {blob_name} from container {course_id}")
    except ResourceNotFoundError:
        print(f"File {blob_name} not found in container {course_id}")
    except Exception as e:
        print(f"Error deleting {blob_name}: {e}")
        
'''
- example using: delete_file(course_id, "userupload", "video folder", "lecture.mp4")
'''

