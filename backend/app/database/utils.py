import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict, Optional
from app.models.postgre_model import UserInfo, Course, ChatHistory, QuizQuestion, ExamQuestion, StudyGuide

# Load environment variables
load_dotenv()

# Database configuration
DB_NAME = os.getenv("DB_NAME", "postgres")
DB_USER = os.getenv("DB_USER", "admintu")
DB_PASSWORD = os.getenv("DB_PASSWORD", "educhain123@")
DB_HOST = os.getenv("DB_HOST", "educhain.postgres.database.azure.com")
DB_PORT = os.getenv("DB_PORT", 5432)

def get_db_connection():
    """
    Create a connection to the PostgreSQL database
    
    Returns:
        Connection: Database connection object
    """
    try:
        return psycopg.connect(
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            host=DB_HOST,
            port=DB_PORT,
            row_factory=dict_row
        )
    except psycopg.Error as e:
        print(f"Error connecting to database: {e}")
        raise

# Quiz Functions
def initQuiz():
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

def insertQuiz(question: str, options: List[str], correct_answer: str) -> int:
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
            result = cur.fetchone()
            conn.commit()
            return result['id']

# Exam Functions
def initExam():
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

def insertExam(question: str, options: List[str], correct_answer: str) -> int:
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
            result = cur.fetchone()
            conn.commit()
            return result['id']

# Study Guide Functions
def initStudyGuide():
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

def insertStudyGuide(topic: str, content: str) -> int:
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
            result = cur.fetchone()
            conn.commit()
            return result['id']

if __name__ == "__main__":
    # Initialize all tables when running directly
    initUserInfo()
    initCourse()
    initChatHistory()
    initQuiz()
    initExam()
    initStudyGuide()
    print("Database tables initialized successfully")