from fastapi import APIRouter, HTTPException
from app.services.auth import register_user, login_user, login_via_wallet_address, get_current_user_by_wallet
from app.models.auth_model import RegisterRequest, LoginRequest, Token
# import BaseModel
from pydantic import BaseModel

router = APIRouter()

class WalletLoginRequest(BaseModel): # New Pydantic model for wallet login
    wallet_address: str

class LoginResponse(BaseModel):
    wallet_address: str

# @router.post("/register", response_model=Token)
# def register(user: RegisterRequest):
#     token = register_user(user)
#     if not token:
#         raise HTTPException(status_code=400, detail="Registration failed")
#     return token    

# @router.post("/login", response_model=Token)
# def login(user: LoginRequest):
#     token = login_user(user)
#     if not token:
#         raise HTTPException(status_code=401, detail="Invalid credentials")
#     return token


@router.post("/login")
def login(request: WalletLoginRequest): # Changed to use the Pydantic model
    wallet_address = login_via_wallet_address(request.wallet_address) # Access wallet_address from the request model
    if not wallet_address:
        raise HTTPException(status_code=401, detail="Invalid wallet address")
    return wallet_address

