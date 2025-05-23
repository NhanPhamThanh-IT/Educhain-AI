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
                    quiz_id TEXT NOT NULL,
                    question TEXT NOT NULL,
                    correct_answer TEXT NOT NULL,
                    options TEXT[],
                    is_finished BOOLEAN DEFAULT FALSE,
                    is_correct BOOLEAN DEFAULT FALSE,
                    course_id TEXT,
                    explaination TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def save_quiz_question(quiz_id: str, question: str, options: List[str], correct_answer: str) -> Dict:


def save_quiz_is_finished(id: str, is_correct: bool, is_finished: bool) -> Dict:
    """Insert quiz question into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE quiz_question
                SET is_correct = %s, is_finished = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (is_correct, is_finished, datetime.now(), id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None


def get_quiz_by_quiz_id(quiz_id: str) -> List[Dict]:
    """Get quiz question by quiz_id"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM quiz_question WHERE quiz_id = %s",
                (quiz_id,)
            )
            result = cur.fetchall()
        return result if result else None

# streghth is all quiz question that user got correct
# weakness is all quiz question that user got wrong


def save_user_strength_weakness(user_id: str, quiz_id: str) -> Dict:
    """Insert user strength and weakness into database"""
    res = get_quiz_by_quiz_id(quiz_id)
    strength = []
    weakness = []
    for quiz in res:
        if quiz['is_correct']:
            strength.append(quiz['question'])
        else:
            weakness.append(quiz['question'])
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE user_info
                SET strength = %s, weakness = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (strength, weakness, datetime.now(), user_id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None


def save_quiz(course_id: str, quiz_id: str, question: str, options: List[str], correct_answer: str) -> Dict:
    """Insert quiz question"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            options_array = "{" + ",".join(f'"{option}"' for option in options) + "}"  
            cur.execute(
                """
                INSERT INTO quiz_question (quiz_id, question, options, correct_answer,created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (quiz_id, question, options_array, correct_answer, datetime.now(), datetime.now())
            )
            quiz_res = cur.fetchone()
            quiz_id = quiz_res['id']
            # Check if quiz_id already exists in the course's quiz_question array, if not append it
            cur.execute(
                """
                UPDATE course
                SET quiz_question = CASE
                    WHEN %s = ANY(quiz_question) THEN quiz_question
                    ELSE array_append(quiz_question, %s)
                END 
                WHERE id = %s
                RETURNING *
                """,
                (quiz_id, quiz_id, course_id)
            )
            course_res = cur.fetchone()
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
                """
                UPDATE course
                SET quiz_question = array_remove(quiz_question, %s)
                WHERE %s = ANY(quiz_question)
                """,
                (quiz_id, quiz_id)
            )

            cur.execute(
                "DELETE FROM quiz_question WHERE id = %s RETURNING *",
                (quiz_id,)
            )
            deleted = cur.rowcount > 0 
        conn.commit()
        return deleted


def save_quiz_explaination(id: str, explaination: str) -> Dict:
    """Insert quiz explaination into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE quiz_question
                SET explaination = %s, updated_at = %s
                WHERE id = %s
                RETURNING *
                """,
                (explaination, datetime.now(), id)
            )
            result = cur.fetchone()
        conn.commit()
        return result if result else None