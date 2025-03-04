from fastapi import APIRouter
from app.services import auth
router = APIRouter()

# Thêm các router con vào router chính
router.include_router(auth.router, prefix="/auth", tags=["auth"])