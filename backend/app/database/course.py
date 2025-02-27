import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict, Optional
from app.database import get_db_connection

# Course Functions
def initCourse():
    """Initialize course table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS course (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER,
                    name VARCHAR(255) NOT NULL,
                    category VARCHAR(255) NOT NULL,
                    introduction VARCHAR(50),
                    description VARCHAR(100),
                    price DECIMAL(100, 2) DEFAULT 0,
                    learning_materials_path TEXT,
                    lesson TEXT[],
                    quiz_question INTEGER[],
                    exam_question INTEGER[],
                    video TEXT[],
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                
            """)
            cur.execute("""
                CREATE INDEX IF NOT EXISTS idx_course_user_id 
                ON message(user_id)
            """)
        conn.commit()

def insertCourse(name:str, category:str, introduction:str, description:str, price:float, learning_materials_path:str) -> Dict:
    """Insert course into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO course (name, category, introduction, description, price, learning_materials_path, 
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

def getCourseId(course_id: int) -> Optional[Course]:
    """Get course by ID"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course WHERE id = %s", (course_id,))
            result = cur.fetchone()
            return Course(**result) if result else None

def getCourseAll() -> List[Course]:
    """Get all courses"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course")
            rows = cur.fetchall()
            return [Course(**row) for row in rows] if rows else []

def updateCourse(course_id: int, name: str, category: str, intro: str, desc: str, price: float,
                path: str, lesson: List[str], quizzes: List[int], exams: List[int], 
                videos: List[str]) -> Optional[Course]:
    """Update course information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET name = %s, category = %s, introduction = %s, description = %s,
                    price = %s, learning_materials_path = %s, lesson = %s,
                    quiz_question = %s, exam_question = %s, video = %s, 
                    updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (name, category, intro, desc, Decimal(str(price)), path, lesson,
                 quizzes, exams, videos, datetime.now(), course_id)
            )
            result = cur.fetchone()
            conn.commit()
            return Course(**result) if result else None

def delCourse(course_id: int) -> bool:
    """Delete course"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM course WHERE id = %s RETURNING *", (course_id,))
            conn.commit()
            return cur.rowcount > 0