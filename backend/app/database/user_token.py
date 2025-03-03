import os
import secrets
import jwt
from datetime import datetime, timedelta
from dotenv import load_dotenv
from app.database import get_db_connection

SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
TOKEN_EXPIRY_HOURS = 1  
REFRESH_TOKEN_EXPIRY_DAYS = 7  # Thời gian hết hạn của Refresh Token

def init_user_tokens():
    """
    Khởi tạo bảng user_tokens nếu chưa tồn tại, thêm refresh_token và index tối ưu hóa.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Tạo bảng nếu chưa có
            cur.execute("""
                CREATE TABLE IF NOT EXISTS user_tokens (
                    id SERIAL PRIMARY KEY,
                    user_id INT REFERENCES user_info(id) ON DELETE CASCADE,
                    token TEXT UNIQUE NOT NULL,
                    refresh_token TEXT UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)

            # Tạo index nếu chưa tồn tại
            cur.execute("""
                DO $$ 
                BEGIN
                    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_user_tokens_user_id') THEN
                        CREATE INDEX idx_user_tokens_user_id ON user_tokens(user_id);
                    END IF;
                END $$;
            """)

        conn.commit()


def generate_and_store_token(user_id: int):
    """
    Tạo Access Token và Refresh Token, lưu vào database
    """
    access_token_exp = datetime.utcnow() + timedelta(hours=TOKEN_EXPIRY_HOURS)
    refresh_token_exp = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRY_DAYS)

    access_token = jwt.encode({"user_id": user_id, "exp": access_token_exp}, SECRET_KEY, algorithm=ALGORITHM)
    refresh_token = jwt.encode({"user_id": user_id, "exp": refresh_token_exp}, SECRET_KEY, algorithm=ALGORITHM)

    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                INSERT INTO user_tokens (user_id, token, refresh_token, created_at, updated_at) 
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (user_id) 
                DO UPDATE SET token = EXCLUDED.token, refresh_token = EXCLUDED.refresh_token, updated_at = NOW()
                """, (user_id, access_token, refresh_token, datetime.utcnow(), datetime.utcnow()))
        conn.commit()

    return access_token, refresh_token


def authenticate_token(token: str) -> dict:
    """
    Xác thực JWT, kiểm tra token có hợp lệ và còn trong database không.
    """
    try:
        decoded_token = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = decoded_token["user_id"]

        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM user_tokens WHERE user_id = %s AND token = %s", (user_id, token))
                result = cur.fetchone()

        if not result:
            return None  # Token không hợp lệ hoặc đã bị thu hồi

        return decoded_token  # Token hợp lệ

    except jwt.ExpiredSignatureError:
        return {"message": "Token đã hết hạn, cần refresh", "error": "expired"}
    except jwt.InvalidTokenError:
        return None  # Token không hợp lệ


def refresh_access_token(refresh_token: str):
    """
    Dùng Refresh Token để tạo Access Token mới.
    """
    try:
        decoded = jwt.decode(refresh_token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = decoded["user_id"]

        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT * FROM user_tokens WHERE user_id = %s AND refresh_token = %s", (user_id, refresh_token))
                result = cur.fetchone()

        if not result:
            return {"message": "Refresh Token không hợp lệ"}, 401

        new_access_token = jwt.encode({"user_id": user_id, "exp": datetime.utcnow() + timedelta(hours=TOKEN_EXPIRY_HOURS)}, SECRET_KEY, algorithm=ALGORITHM)

        with get_db_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("UPDATE user_tokens SET token = %s, updated_at = NOW() WHERE user_id = %s", (new_access_token, user_id))
            conn.commit()

        return {"access_token": new_access_token}, 200

    except jwt.ExpiredSignatureError:
        return {"message": "Refresh Token đã hết hạn, cần đăng nhập lại"}, 401
    except jwt.InvalidTokenError:
        return {"message": "Refresh Token không hợp lệ"}, 401


def delete_token(user_id: int, token: str) -> bool:
    """
    Xóa token khi user logout.
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM user_tokens WHERE user_id = %s AND token = %s", (user_id, token))
        conn.commit()
        return cur.rowcount > 0


def delete_all_tokens(user_id: int) -> bool:
    """
    Xóa tất cả token của user (logout toàn bộ thiết bị).
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM user_tokens WHERE user_id = %s", (user_id,))
        conn.commit()
        return cur.rowcount > 0
