from fastapi import APIRouter
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import storage
from app.api.v1.endpoints import chatbot
from app.api.v1.endpoints import blob_storage
from app.api.v1.endpoints import file_processing
from app.api.v1.endpoints import user

router = APIRouter()

# Thêm các router con vào router chính
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(user.router, prefix="/user", tags=["user"]) 
router.include_router(storage.router, prefix = "/storage", tags=["storage"])
router.include_router(chatbot.router, prefix = "/chatbot", tags=["chatbot"])
router.include_router(blob_storage.router, prefix = "/blob", tags=["blob"])
router.include_router(file_processing.router, prefix= "/file", tags=["file"])

# /api/auth/login -> POST Login 
# Truyền về
# {
#     "email": "string",
#     "password": "string"
# }
# # Lấy được
# {
#     "access_token": "string"
# }

# # /api/auth/register -> POST Register
# # Truyền về
# {
#     "email": "string",
#     "password": "string",
#     "fullname": "string",
# }
# # Lấy được
# {
#     "access_token": "string"
# }

# # /api/user/profile -> GET profile 
# # Truyền về token
# {
#     "token": "string"
# }
# # Lấy được
# {
#     "email": "string",
#     "password": "string",
#     "fullname": "string",
# }

# # /api/user_id/create_course -> POST upload file
# # Truyền về
# {
#     "user_id": "int",
#     "course_name": "string",
#     "introduction": "string",
#     "description": "string",
#     "category": "string",
# }
# # Nhận được course-id
# {
#     "course_id": "string"
# }


# # /api/storage/upload -> POST upload file
# # Truyền về
# {

#     "file": "File"
# }
# # Lấy được
# {
#     "url": "string",
#     "status_code": "int",
#     "type_doc": "string"
# }

# # /api/file/process-pdf -> POST process pdf # Check xem nếu có file thì mới chạy cái này
# # Truyền về
# {
#     "file": "File"
# }
# # Lấy được
# {
#     "success": "bool",
#     "message": "true"
# }
# # True thì tạo course thành công

# # /api/chatbot/chat/stream -> POST chatbot
# # Truyền về
# {
#     "course_name": "string",
#     "question": "string",
#     "thread_id": "string",
#     "course_id": "string"
# }
# # Lấy được
# {
#     "answer": "string" # Cái này nó yeild nó in liên tục
# }






