import os
from decimal import Decimal
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict, Optional
from app.models.postgre_model import UserInfo, Course, ChatHistory

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

# UserInfo Functions
def initUserInfo():
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
                    address TEXT,
                    phonenumber VARCHAR(20),
                    edutoken DECIMAL(10, 2) DEFAULT 0,
                    learntoken DECIMAL(10, 2) DEFAULT 0,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def insertUserInfo(user_info: UserInfo) -> int:
    """Insert user information into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO user_info (fullname, nickname, gender, country, address, phonenumber, edutoken, learntoken, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """,
                (user_info.fullname, user_info.nickname, user_info.gender, user_info.country,
                 user_info.address, user_info.phonenumber, user_info.edutoken, user_info.learntoken,
                 user_info.created_at, user_info.updated_at)
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def getUserInfo(user_id: int) -> Optional[UserInfo]:
    """Get user information from database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM user_info WHERE id = %s",
                (user_id,)
            )
            result = cur.fetchone()
            return UserInfo(**result) if result else None

def updateUserInfo(user_id: int, fullname: str, nickname: str, gender: str, country: str, 
                  address: str, phonenumber: str) -> Optional[UserInfo]:
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
            return UserInfo(**result) if result else None

def updateUserWallet(user_id: int, edutoken: float, learntoken: float) -> Optional[UserInfo]:
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
            return UserInfo(**result) if result else None

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

# Course Functions
def initCourse():
    """Initialize course table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS course (
                    id SERIAL PRIMARY KEY,
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
        conn.commit()

def insertCourse(course: Course) -> int:
    """Insert course into database"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO course (name, category, introduction, description, price, learning_materials_path, 
                                  lesson, quiz_question, exam_question, video, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (course.name, course.category, course.introduction, course.description,
                 Decimal(str(course.price)), course.learning_materials_path, course.lesson,
                 course.QuizQuestion, course.ExamQuestion, course.Video,
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

# Chat History Functions
def initChatHistory():
    """Initialize chat_history table"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS chat_history (
                    id SERIAL PRIMARY KEY,
                    thread_id VARCHAR(255) NOT NULL,
                    question TEXT NOT NULL,
                    answer TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
        conn.commit()

def insertChatHistory(thread_id: str, question: str, answer: str) -> int:
    """Insert chat history record"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO chat_history (thread_id, question, answer, created_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id
                """,
                (thread_id, question, answer, datetime.now())
            )
            result = cur.fetchone()
            conn.commit()
            return result['id']

def getHistoryThread(thread_id: str) -> Optional[ChatHistory]:
    """Get chat history by thread_id"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM chat_history WHERE thread_id = %s",
                (thread_id,)
            )
            result = cur.fetchone()
            return ChatHistory(**result) if result else None

def delHistoryAll():
    """Delete all chat history"""
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("DELETE FROM chat_history")
            conn.commit()

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