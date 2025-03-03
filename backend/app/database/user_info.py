import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection


# UserInfo Functions
def init_user_info():
    """Initialize user_info table if it doesn't exist"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS user_info (
                    id SERIAL PRIMARY KEY,
                    fullname VARCHAR(255) NOT NULL,
                    nickname VARCHAR(255),
                    gender VARCHAR(50),
                    country VARCHAR(100),
                    courseList INTEGER[]
                    address TEXT,
                    phonenumber VARCHAR(20),
                    edutoken DECIMAL(10, 2) DEFAULT 0,
                    learntoken DECIMAL(10, 2) DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_user_info(fullname: str, nickname: str, gender: str, country:str, address:str, phonenumber:str, edutoken:float, learntoken:float) -> Dict:
    """Insert user information into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO user_info (fullname, nickname, gender, country, address, phonenumber, edutoken, learntoken, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """,
                (fullname, nickname, gender, country,
                 address, phonenumber, Decimal(str(edutoken)), Decimal(str(learntoken)),
                 datetime.now(), datetime.now())
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def get_user_info(user_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM user_info WHERE id = %s",
                (user_id,)
            )
            result = cur.fetchone()
        return result if result else None

def updateUserInfo(user_id: int, fullname: str, nickname: str, gender: str, country: str, 
                  address: str, phonenumber: str) -> Dict:
    """Update user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE user_info
                SET fullname = %s, nickname = %s, gender = %s, country = %s, 
                    address = %s, phonenumber = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (fullname, nickname, gender, country, address, phonenumber, 
                 datetime.now(), user_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None

def updateUserWallet(user_id: int, edutoken: float, learntoken: float) -> Dict:
    """Update user's wallet tokens"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE user_info
                SET edutoken = %s, learntoken = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (Decimal(str(edutoken)), Decimal(str(learntoken)), datetime.now(), user_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None

def delUserInfo(user_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM user_info WHERE id = %s RETURNING *",
                (user_id,)
            )
        conn.commit()
        return cur.rowcount > 0
