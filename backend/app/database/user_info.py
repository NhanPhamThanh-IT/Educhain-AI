import os
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.models.postgre_model import UserInfo

load_dotenv()

# Nên đổi lại cái này để phù hợp với cấu trúc của project
DB_NAME = "postgres"
DB_USER = "admintu"
DB_PASSWORD = 'educhain123@'
DB_HOST = "educhain.postgres.database.azure.com"
DB_PORT = 5432

def get_db_connection():
    """
    Tạo kết nối đến cơ sở dữ liệu PostgreSQL
    
    Returns:
        Connection: Đối tượng kết nối đến database
    """
    return psycopg.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        row_factory=dict_row
    )

def init_user_info():
    """
    Khởi tạo bảng user_info trong database nếu chưa tồn tại
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Enable UUID extension if not exists
            # cur.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
            
            # Create table if not exists
            cur.execute("""
                CREATE TABLE IF NOT EXISTS user_info (
                    id SERIAL PRIMARY KEY,
                    fullname VARCHAR(255) NOT NULL,
                    nickname VARCHAR(255),
                    gender VARCHAR(50),
                    country VARCHAR(100),
                    address TEXT,
                    phonenumber VARCHAR(20),
                    edutoken DECIMAL(10, 2) DEFAULT 0,
                    learntoken DECIMAL(10, 2) DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_user_info(user_info: UserInfo) -> int:
    """
    Lưu thông tin người dùng vào database
    
    Args:
        user_info (UserInfo): Thông tin người dùng
        
    Returns:
        int: ID của người dùng vừa được lưu
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO user_info (fullname, nickname, gender, country, address, phonenumber, edutoken, learntoken, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """,
                (user_info.fullname, user_info.nickname, user_info.gender, user_info.country, user_info.address, user_info.phonenumber, user_info.edutoken, user_info.learntoken, user_info.created_at, user_info.updated_at)
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def get_user_info(user_id: int) -> UserInfo:
    """
    Lấy thông tin người dùng từ database
    
    Args:
        user_id (int): ID của người dùng
        
    Returns:
    UserInfo: Thông tin người dùng
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, fullname, nickname, gender, country, address, phonenumber, edutoken, learntoken, created_at, updated_at
                FROM user_info 
                WHERE id = %s
                """,
                (user_id,)
            )
            result = cur.fetchone()
            if result:
                return UserInfo(**result)
            else:
                return None

# Initialize table when module is imported
init_user_info()