from fastapi import APIRouter
from app.api.v1.endpoints import auth
from app.api.v1.endpoints import storage
from app.api.v1.endpoints import chatbot
from app.api.v1.endpoints import blob_storage
from app.api.v1.endpoints import file_processing

router = APIRouter()

# Thêm các router con vào router chính
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(storage.router, prefix = "/storage", tags=["storage"])
router.include_router(chatbot.router, prefix = "/chatbot", tags=["chatbot"])
router.include_router(blob_storage.router, prefix = "/blob", tags=["blob"])
router.include_router(file_processing.router, prefix= "/file", tags=["file"])
