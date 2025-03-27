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
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    user_id INTEGER NOT NULL,
                    threads TEXT[],
                    name VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    introduction TEXT,
                    description TEXT,
                    lesson UUID[],
                    quiz_question INTEGER[],
                    exam_question INTEGER[],
                    study_guide INTEGER[],
                    document INTEGER[],
                    wallet_address TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES "user_info"(id) ON DELETE CASCADE
                )
                
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_course_user_id 
                ON course(user_id)
            """)
        conn.commit()

def save_course(user_id: int, name:str, category:str, introduction:str, description:str, lessons: List[str]) -> Dict:
    """Insert course into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO course (user_id, name, category, introduction, description, lessons,
                                  created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s,%s, %s, %s)
                RETURNING *
                """,
                (user_id, name, category, introduction, description, lessons,
                 datetime.now(), datetime.now())
            )
            result = cur.fetchone()
            course_id = result['id'] if result else None

            if course_id:
                cur.execute(
                    """
                    UPDATE user_info
                    SET courselist = array_append(courselist, %s)
                    WHERE id = %s
                    RETURNING *
                    """,
                    (course_id, user_id)
                )
        conn.commit()
        return result

def append_thread(course_id: str ,thread_id: str) -> Dict:
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


def get_course_id(course_id: str) -> Dict:
    """Get course by ID"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course WHERE id = %s", (course_id,))
            result = cur.fetchone()
        return result if result else None

def get_course_all(user_id: str) -> List[Dict]:
    """Get all courses"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT * FROM course
                WHERE user_id = %s
            """,
            (user_id)
            )
            rows = cur.fetchall()
        return rows

def update_course(course_id: str,user_id: int, name: str, category: str, intro: str, desc: str, lessons: List[str]) -> Dict:
    """Update course information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET user_id = %s, name = %s, category = %s, introduction = %s, description = %s, lessons = %s,
                    updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (user_id, name, category, intro, desc, lessons, datetime.now(), course_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None

def delete_course(course_id: str) -> bool:
    """Delete course"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM course WHERE id = %s", (course_id,))
            deleted = cur.rowcount > 0
        conn.commit()
        return deleted