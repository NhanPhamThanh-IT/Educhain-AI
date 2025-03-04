import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Exam Functions
def init_mission():
    """Initialize exam_question table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS mission (
                    id SERIAL PRIMARY KEY,
                    name TEXT,
                    reward INTEGER,
                    percent INTEGER,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_mission(name: str, reward: int) -> Dict:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO mission (name, reward, percent, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (name, reward, percent, datetime.now(), datetime.now())
            )
            mission_res = cur.fetchone()
            mission_id = mission_res['id']
        conn.commit()
        return mission_id

def get_mission_id(mission_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM mission WHERE id = %s",
                (mission_id,)
            )
            result = cur.fetchone()
        return result if result else None

def update_mission(mission_id: int, percent: int) -> bool:
    """Cập nhật phần trăm hoàn thành của nhiệm vụ (mission)"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE mission
                SET percent = %s, updated_at = %s
                WHERE id = %s
                """,
                (percent, datetime.utcnow(), mission_id)
            )
            updated = cur.rowcount > 0  # Kiểm tra có dòng nào được cập nhật không
        conn.commit()
        return updated

def delete_mission(mission_id: int) -> bool:
    """Xóa nhiệm vụ (mission) theo mission_id"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM mission
                WHERE id = %s
                """,
                (mission_id,)
            )
            deleted = cur.rowcount > 0  # Kiểm tra có dòng nào bị xóa không
        conn.commit()
        return deleted

def complete_mission() -> bool:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM missions
                WHERE percent_complete = 100
                """
            )
            deleted = cur.rowcount > 0 
        conn.commit()
        return deleted




