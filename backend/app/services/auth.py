from app.database import get_db_connection
from datetime import datetime
import bcrypt
from pydantic import BaseModel
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import Response, HTTPException, status, Depends, APIRouter, Form
import secrets
from datetime import datetime, timedelta
import jwt
from google.oauth2 import id_token
from google.auth.transport import requests

router = APIRouter()

SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"

class SignupRequest(BaseModel):
    email: str
    password: str

# Thời gian hết hạn của token
ACCESS_TOKEN_EXPIRE_HOURS = 1  # Access Token có hiệu lực trong 1 giờ

def generate_access_token(user_id: int):
    """
    Tạo Access Token.
    """
    access_token_exp = datetime.utcnow() + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)

    access_token = jwt.encode(
        {"user_id": user_id, "exp": access_token_exp}, 
        SECRET_KEY, 
        algorithm=ALGORITHM
    )

    return access_token

def authenticate_token(token: str):
    """
    Xác thực Access Token.
    """
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decoded_token  # Trả về dữ liệu nếu hợp lệ
    except jwt.ExpiredSignatureError:
        return {"message": "Token đã hết hạn", "error": "expired"}
    except jwt.InvalidTokenError:
        return None  # Token không hợp lệ


@router.post("/login")
def login_user(response: Response, form_data: OAuth2PasswordRequestForm = Depends()):
    """Xác thực user và tạo token"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT id, password FROM user_info WHERE email = %s", (form_data.username,))
                user = cur.fetchone()
        
        if not user:
            return {"message": "User không tồn tại"}, 404

        user_id = user['id']
        hashed_password = user['password']

        if not bcrypt.checkpw(form_data.password.encode("utf-8"), hashed_password.encode("utf-8")):
            return {"message": "Sai mật khẩu"}, 401

        access_token = generate_access_token(user_id)

         # Lưu token vào HttpOnly cookies
        response.set_cookie(key="access_token", value=access_token, httponly=True, samesite="Strict", secure=True)


        return {"message": "Login successful", "access":access_token}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi server: {str(e)}")

def hash_password(password: str) -> str:
    """Mã hóa mật khẩu trước khi lưu vào database"""
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


@router.post("/signup")
async def signup(response: Response, signup_data: SignupRequest):
    """Đăng ký user và tạo Access Token"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cur:
                # Kiểm tra email đã tồn tại chưa
                cur.execute("SELECT id FROM user_info WHERE email = %s", (signup_data.email,))
                existing_user = cur.fetchone()
                if existing_user:
                    raise HTTPException(status_code=400, detail="Email đã tồn tại")

                # Mã hóa mật khẩu
                hashed_password = hash_password(signup_data.password)

                # Tạo user mới
                cur.execute("""
                    INSERT INTO user_info (email, password, created_at, updated_at)
                    VALUES (%s, %s, %s,%s) RETURNING id
                """, (signup_data.email, hashed_password, datetime.utcnow(), datetime.utcnow()))
                
                user_id = cur.fetchone()["id"]
                conn.commit()

        # Tạo Access Token
        access_token = generate_access_token(user_id)

        # Lưu token vào HttpOnly cookies
        response.set_cookie(key="access_token", value=access_token, httponly=True, samesite="Strict", secure=True)

        form_data = OAuth2PasswordRequestForm(username=signup_data.email, password=signup_data.password, scope="")
        return {"message": "Signup successful", "access":access_token}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi server: {str(e)}")

# Lấy GOOGLE_CLIENT_ID từ biến môi trường
GOOGLE_CLIENT_ID = "GOOGLE_CLIENT_ID"

# Định nghĩa request body
class GoogleToken(BaseModel):
    credential: str  # Nhận ID Token từ frontend

@router.post("/google")
def verify_google_token(token_data: GoogleToken):
    try:
        # Xác thực và giải mã ID Token từ Google
        id_info = id_token.verify_oauth2_token(
            token_data.credential, requests.Request(), GOOGLE_CLIENT_ID
        )

        # Trích xuất thông tin user
        user_info = {
            "email": id_info.get("email"),
            "name": id_info.get("name"),
            "picture": id_info.get("picture"),
            "sub": id_info.get("sub"),  # Google User ID
        }

        return {"user": user_info}

    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google Token")