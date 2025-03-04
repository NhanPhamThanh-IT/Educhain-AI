from fastapi import APIRouter
from app.services import auth
from app.api.v1.endpoints import storage

router = APIRouter()

# Thêm các router con vào router chính
router.include_router(auth.router, prefix="/auth", tags=["auth"])
router.include_router(storage.router, prefix = "/storage", tags=["storage"])