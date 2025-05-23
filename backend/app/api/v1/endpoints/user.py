from fastapi import APIRouter, Depends
from app.services.auth import get_current_user, get_current_user_by_wallet, update_user_info
from fastapi import HTTPException
from app.models.auth_model import RegisterRequest

router = APIRouter()

@router.get("/current_user")
def get_current_user(wallet_address: str):
    user = get_current_user_by_wallet(wallet_address)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid wallet address")
    return user

@router.post("/update_user")
def update_user(user: RegisterRequest):
    updated_user = update_user_info(user)
    if not updated_user:
        raise HTTPException(status_code=400, detail="Update failed")
    return updated_user

