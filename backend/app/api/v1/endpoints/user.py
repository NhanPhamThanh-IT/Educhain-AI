from fastapi import APIRouter, Depends
from app.services.auth import get_current_user

router = APIRouter()

@router.get("/profile")
def get_profile(current_user: dict = Depends(get_current_user)):
    return current_user
