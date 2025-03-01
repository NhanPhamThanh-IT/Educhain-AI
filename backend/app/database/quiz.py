import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.database import get_db_connection

# Quiz Functions
def init_quiz():
    """Initialize quiz_question table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS quiz_question (
                    id SERIAL PRIMARY KEY,
                    question TEXT NOT NULL,
                    options TEXT[] NOT NULL,
                    correct_answer TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_quiz(course_id:int, question: str, options: List[str], correct_answer: str) -> Dict:
    """Insert quiz question"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO quiz_question (question, options, correct_answer, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id
                """,
                (question, options, correct_answer, datetime.now(), datetime.now())
            )
            quiz_res = cur.fetchone()
            quiz_id = quiz_res['id']
            cur.execute(
                """
                UPDATE course
                SET quiz_question = array_append(quiz_question, %s)
                WHERE id = %s
                RETURNING *
                """,
                (quiz_id,course_id)
            )
            course_res = cur.fetchone()
        conn.commit()
        return {"quiz": quiz_res, "updated_course": course_res}

def get_quiz_id(quiz_id: int) -> Dict:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM quiz_question WHERE id = %s",
                (quiz_id,)
            )
            result = cur.fetchone()
        return result if result else None

def delete_quiz(quiz_id: int) -> bool:
    """Delete user information"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "DELETE FROM quiz_question WHERE id = %s RETURNING *",
                (quiz_id,)
            )
            deleted = cur.rowcount > 0 
        conn.commit()
        return deleted

