import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Course Functions
def init_course():
    """Initialize course table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS course (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER NOT NULL,
                    threads TEXT[],
                    name VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    introduction VARCHAR(50),
                    description VARCHAR(100),
                    price DECIMAL(100, 2) DEFAULT 0,
                    lesson TEXT[],
                    quiz_question INTEGER[],
                    exam_question INTEGER[],
                    study_guide INTERGER[],
                    document INTERGER[],
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
                )
                
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_course_user_id 
                ON course(user_id)
            """)
        conn.commit()

def save_course(user_id: int, name:str, category:str, introduction:str, description:str, price:float) -> Dict:
    """Insert course into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO course (user_id, name, category, introduction, description, price, 
                                  created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (name, category, introduction, description,
                 Decimal(str(price)), learning_materials_path,
                 datetime.now(), datetime.now())
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def append_thread(course_id: int ,thread_id: str) -> Dict:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET threads = array_append(threads, %s)
                WHERE id = %s
                RETURNING *;
                """,
                (thread_id, course_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result


def get_course_id(course_id: int) -> Dict:
    """Get course by ID"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course WHERE id = %s", (course_id,))
            result = cur.fetchone()
        return result if result else None

def get_course_all() -> List[Dict]:
    """Get all courses"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course")
            rows = cur.fetchall()
        return rows

def update_course(course_id: int,user_id: int, name: str, category: str, intro: str, desc: str, price: float) -> Dict:
    """Update course information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET user_id = %s, name = %s, category = %s, introduction = %s, description = %s,
                    price = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (user_id, name, category, intro, desc, Decimal(str(price)), datetime.now(), course_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None

def delete_course(course_id: int) -> bool:
    """Delete course"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM course WHERE id = %s", (course_id,))
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted