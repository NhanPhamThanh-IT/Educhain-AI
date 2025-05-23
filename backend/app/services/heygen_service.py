import requests
import json

# Thay bằng API key thật của bạn
API_KEY = "MTA4NWYxOTgzMzQ3NDJlZmE1NDRhMTJiNzZhYTY0NWYtMTc0NzkyNjcxMQ=="
API_URL = "https://api.heygen.com/v2/video/generate"

# Prompt bạn muốn nhân vật nói
prompt = "Welcome to the Educhain system."

# Cấu hình video
payload = {
    "video_inputs": [
        {
            "character": {
                "type": "avatar",
                "avatar_id": "Daisy-inskirt-20220818",   # Có thể thay bằng avatar khác
                "avatar_style": "normal"
            },
            "voice": {
                "type": "text",
                "input_text": prompt,
                "voice_id": "2d5b0e6cf36f460aa7fc47e3eee4ba54"  # Giọng nói Tiếng Anh nữ
            },
            "background": {
                "type": "color",
                "value": "#008000"  # Màu nền xanh lá cây
            }
        }
    ],
    "dimension": {
        "width": 1280,
        "height": 720
    }
}

# Headers kèm API key
headers = {
    "X-Api-Key": API_KEY,
    "Content-Type": "application/json"
}

# Gửi POST request
response = requests.post(API_URL, headers=headers, data=json.dumps(payload))

# In kết quả
if response.status_code == 200:
    result = response.json()
    print("Video generated successfully!")
    print("Video ID:", result.get("video_id"))
    print("Status:", result.get("status"))
    print("Check result:", result)
else:
    print("Failed to generate video:")
    print(response.status_code, response.text)
