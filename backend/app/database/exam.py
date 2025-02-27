import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Exam Functions
def init_exam():
    """Initialize exam_question table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS exam_question (
                    id SERIAL PRIMARY KEY,
                    question TEXT NOT NULL,
                    options TEXT[] NOT NULL,
                    correct_answer TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_exam(course_id:int, question: str, options: List[str], correct_answer: str) -> int:
    """Insert exam question"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO exam_question (question, options, correct_answer, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (question, options, correct_answer, datetime.now(), datetime.now())
            )
            exam_res = cur.fetchone()
            exam_id = exam_res['id']
            cur.execute(
                """
                UPDATE course
                SET exam_question = array_append(exam_question, %s)
                WHERE id = %s
                RETURNING *
                """
            )
            course_res = cur.fetchone()
        conn.commit()
        return {"exam": exam_res, "updated_course": course_res}

def get_exam_id(exam_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM exam_question WHERE id = %s",
                (exam_id,)
            )
            result = cur.fetchone()
        return result if result else None

def delete_exam(exam_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM exam_question WHERE id = %s RETURNING *",
                (exam_id,)
            )
        conn.commit()
        return cur.rowcount > 0


