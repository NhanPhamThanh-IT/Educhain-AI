import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Study Guide Functions
def init_study_guide():
    """Initialize study_guide table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS study_guide (
                    id SERIAL PRIMARY KEY,
                    topic VARCHAR(255) NOT NULL,
                    content TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_study_guide(course_id:int, topic: str, content: str) -> Dict:
    """Insert study guide"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO study_guide (topic, content, created_at, updated_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (topic, content, datetime.now(), datetime.now())
            )
            sg_res = cur.fetchone()
            sg_id = sg_res['id']
            cur.execute(
                """
                UPDATE course
                SET study_guide = array_append(study_guide, %s)
                WHERE id = %s
                RETURNING *
                """,
                (sg_id,course_id)
            )
            course_res = cur.fetchone()
        conn.commit()
        return {"study_guide": sg_res, "updated_course": course_res}

def get_study_guide_id(sg_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM study_guide WHERE id = %s",
                (sg_id,)
            )
            result = cur.fetchone()
        return result if result else None

def delete_study_guide(sg_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM study_guide WHERE id = %s RETURNING *",
                (sg_id,)
            )
        conn.commit()
        return cur.rowcount > 0


