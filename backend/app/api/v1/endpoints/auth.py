from fastapi import APIRouter, HTTPException
from app.services.auth import register_user, login_user
from app.models.auth_model import RegisterRequest, LoginRequest, Token

router = APIRouter()

@router.post("/register", response_model=Token)
def register(user: RegisterRequest):
    token = register_user(user)
    if not token:
        raise HTTPException(status_code=400, detail="Registration failed")
    return token    

@router.post("/login", response_model=Token)
def login(user: LoginRequest):
    token = login_user(user)
    if not token:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return token
