import requests
import json
import time
import os
import cv2

API_KEY = "MTA4NWYxOTgzMzQ3NDJlZmE1NDRhMTJiNzZhYTY0NWYtMTc0NzkyNjcxMQ=="
API_URL = "https://api.heygen.com/v2/video/generate"
STATUS_URL = "https://api.heygen.com/v1/video_status.get"
input_path = "generated_video.mp4"
output_path = "video_no_logo.mp4"
# Prompt muốn nhân vật nói
prompt = "In today's lesson, we explore the power of persistence. Success is rarely instant. It's built day by day, with effort, learning, and sometimes failure. Every step you take, no matter how small, brings you closer to your goals. So don’t be afraid of making mistakes — be afraid of not trying. Let’s take one more step forward today, together. Welcome to another day of growth and discovery."
# Tạo payload video
payload = {
    "video_inputs": [
        {
            "character": {
                "type": "avatar",
                "avatar_id": "Daisy-inskirt-20220818",
                "avatar_style": "normal"
            },
            "voice": {
                "type": "text",
                "input_text": prompt,
                "voice_id": "2d5b0e6cf36f460aa7fc47e3eee4ba54"
            },
            "background": {
                "type": "color",
                "value": "#000000"
            }
        }
    ],
    "dimension": {
        "width": 1280,
        "height": 720
    }
}

# Headers
headers = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json"
}

start_time = time.time()

# Gửi POST request tạo video
response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    result = response.json()
    print("Video request sent successfully!")
    video_id = result.get("data", {}).get("video_id")
    
    # Kiểm tra trạng thái video định kỳ
    print(f"Waiting for video to be ready (ID: {video_id})...")
    video_status_url = f"https://api.heygen.com/v1/video_status.get?video_id={video_id}"
    while True:
        response = requests.get(video_status_url, headers=headers)
        status = response.json()["data"]["status"]

        if status == "completed":
            video_url = response.json()["data"]["video_url"]
            thumbnail_url = response.json()["data"]["thumbnail_url"]
            print(
                f"Video generation completed! \nVideo URL: {video_url} \nThumbnail URL: {thumbnail_url}"
            )

            # Save the video to a file
            video_filename = "generated_video.mp4"
            with open(video_filename, "wb") as video_file:
                video_content = requests.get(video_url).content
                video_file.write(video_content)
                elapsed = time.time() - start_time
                print(f"⏱️ Video generated in {elapsed:.2f} seconds.")
            

            break
            
        elif status == "processing" or status == "pending":
            print("Video is still processing. Checking status...")
            time.sleep(5)  # Sleep for 5 seconds before checking again
            
        elif status == "failed":
            error = response.json()["data"]["error"]
            print(f"Video generation failed. '{error}'")
            break
else:
    print("Failed to generate video:")
    try:
        print(response.json())
    except Exception:
        print(response.text)
