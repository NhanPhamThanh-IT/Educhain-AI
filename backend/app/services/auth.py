from fastapi import HTTPException, Depends
from app.database.user_info import get_user_by_email, save_user_info
from datetime import datetime, timedelta
from typing import Dict
import jwt
import bcrypt
from app.models import RegisterRequest, LoginRequest, Token
from fastapi.security import OAuth2PasswordBearer


SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Hàm mã hóa mật khẩu
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# Hàm xác thực mật khẩu
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

# Tạo JWT Token
def create_access_token(data: Dict, expires_delta: timedelta = timedelta(hours=1)) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Hàm đăng ký người dùng mới
def register_user(user: RegisterRequest) -> Token:
    # Kiểm tra xem email đã tồn tại chưa
    existing_user = get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Mã hóa mật khẩu
    hashed_password = hash_password(user.password)

    # Lưu người dùng vào cơ sở dữ liệu
    saved_user = save_user_info(user.email, hashed_password, user.fullname, user.nickname, user.gender, user.country, user.address, user.phone, 0.0, 0.0)
    # Tạo và trả về token
    access_token = create_access_token(data={"sub": saved_user["email"]})
    return Token(access_token=access_token)

# Hàm đăng nhập người dùng
def login_user(user: LoginRequest) -> Token:
    # Lấy thông tin người dùng từ cơ sở dữ liệu
    db_user_password = get_user_by_email(user.email)
    if not db_user_password or not verify_password(user.password, db_user_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Tạo và trả về token
    access_token = create_access_token(data={"sub": user.email})
    return Token(access_token=access_token)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)
    email: str = payload.get("sub")
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user