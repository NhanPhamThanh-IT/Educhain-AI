import os
from dotenv import load_dotenv
import psycopg
from psycopg.rows import dict_row
from datetime import datetime
from typing import List, Dict
from app.models.postgre_model import UserInfo, Course, ChatHistory

# Nên đổi lại cái này để phù hợp với cấu trúc của project
DB_NAME = "postgres"
DB_USER = "admintu"
DB_PASSWORD = 'educhain123@'
DB_HOST = "educhain.postgres.database.azure.com"
DB_PORT = 5432

def get_db_connection():
    """
    Tạo kết nối đến cơ sở dữ liệu PostgreSQL
    
    Returns:
        Connection: Đối tượng kết nối đến database
    """
    return psycopg.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST,
        port=DB_PORT,
        row_factory=dict_row
    )

# userInfo
def initUserInfo():
    """
    Khởi tạo bảng user_info trong database nếu chưa tồn tại
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Enable UUID extension if not exists
            # cur.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
            
            # Create table if not exists
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
    """
    Lưu thông tin người dùng vào database
    
    Args:
        user_info (UserInfo): Thông tin người dùng
        
    Returns:
        int: ID của người dùng vừa được lưu
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO user_info (fullname, nickname, gender, country, address, phonenumber, edutoken, learntoken, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """,
                (user_info.fullname, user_info.nickname, user_info.gender, user_info.country, user_info.address, user_info.phonenumber, user_info.edutoken, user_info.learntoken, user_info.created_at, user_info.updated_at)
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def getUserInfo(user_id: int) -> UserInfo:
    """
    Lấy thông tin người dùng từ database
    
    Args:
        user_id (int): ID của người dùng
        
    Returns:
    UserInfo: Thông tin người dùng
    """
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT *
                FROM user_info 
                WHERE id = %s
                """,
                (user_id,)
            )
            result = cur.fetchone()
            if result:
                return UserInfo(**result)
            else:
                return None

def updateUserInfo(user_id: int, fullname:str, nickname:str, gender:str, country:str, address:str, phonenumber:str) -> UserInfo:
    with get_db_connection() as conn:
        cur.execute(
            """
            UPDATE user_info
            SET fullname = %s, nickname = %s, gender = %s, country = %s, address = %s, phonenumber = %s, updated_at = %s
            WHERE id = %s
            """,
            (fullname,nickname,gender,country,address,phonenumber,datetime.now(),user_id,)
        )
        result = cur.fetchone()
        if result:
            return UserInfo(**result)
        else:
            return None

def updateUserWallet(user_id: int, edutoken:float, learntoken:float) -> UserInfo:
    with get_db_connection() as conn:
        cur.execute(
            """
            UPDATE user_info
            SET edutoken = %s, learntoken = %s
            WHERE id = %s
            """,
            (Decimal(edutoken),Decimal(learntoken),user_id,)
        )
        result = cur.fetchone()
        if result:
            return UserInfo(**result)
        else:
            return None

def delUserInfo(user_id: int) -> bool:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM user_info
                WHERE id = %s
                RETURNING *;
                """,
                (user_id,)
            )
            return cur.rowcount > 0

# course
def initCourse():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            # Enable UUID extension if not exists
            # cur.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
            
            # Create table if not exists
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
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO course (name, category, introduction, description, price, learning_materials_path, lesson, quiz_question, exam_question, video, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id;
                """,
                (
                    course.name,
                    course.category,
                    course.introduction,
                    course.description,
                    Decimal(course.price),
                    course.learning_materials_path,
                    course.lesson,
                    course.QuizQuestion,
                    course.ExamQuestion,
                    course.Video,
                    datetime.now(),
                    datetime.now()
                )
            )
            result = cur.fetchone()
        conn.commit()
        return result['id']

def getCourseId(course_id: int) -> Course:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT *
                FROM course
                WHERE id = %s
                """,
                (course_id,)
            )
            result = cur.fetchone()
            if result:
                return Course(**result)
            else:
                return None

def getCourseAll() -> List[Course]:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM course")
            rows = cur.fetchall()
            if not rows:
                return []
            return [Course(**dict(zip([desc[0] for desc in cur.description], row))) for row in rows]

def updateCourse(course_id: int,name:str,category:str,intro:str,desc:str,price:float,path:str,lesson:List[str],quizzes:List[int],exams:List[int],videos:List[str]) -> Course:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE course
                SET name = %s,
                    category = %s,
                    introduction = %s,
                    description = %s,
                    price = %s,
                    learning_materials_path = %s,
                    lesson = %s,
                    quiz_question = %s,
                    exam_question = %s,
                    video = %s,
                    updated_at = %s
                WHERE id = %s
                RETURNING *;
                """,
                (
                    name,
                    category,
                    intro,
                    desc,
                    Decimal(price),  
                    path,
                    lesson,  
                    quizzes,  
                    exams,
                    videos,
                    datetime.now(),
                    course_id,
                )
            )

            result = cur.fetchone()
            if result:
                return Course(**dict(zip([desc[0] for desc in cur.description], result)))
            return None

def delCourse(course_id: int) -> bool:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM course
                WHERE id = %s
                RETURNING *
                """,
                (course_id,)
            )
            return cur.rowcount > 0

# chat history
def initChatHistory():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                CREATE TABLE IF NOT EXISTS chat_history (
                    id SERIAL PRIMARY KEY,
                    thread_id VARCHAR(255) NOT NULL,
                    question TEXT NOT NULL,
                    answer TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
                """
            )
        conn.commit()

def insertChatHistory(thread_id: str, question: str, answer: str) -> int:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO chat_history (thread_id, question, answer, created_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id;
                """,
                (thread_id, question, answer, datetime.now())
            )
            return cur.fetchone()['id']

def getHistoryThread(thread_id: int) -> ChatHistory:
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT *
                FROM chat_history
                WHERE id = %s
                """,
                (thread_id,)
            )
            result = cur.fetchone()
            if result:
                return ChatHistory(**result)
            else:
                return None

def delHistoryAll():
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM chat_history
                """
            )
            conn.commit()

#quiz
def initQuiz():
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
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO quiz_question (question, options, correct_answer, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
                """,
                (question, options, correct_answer, datetime.now(), datetime.now())
            )
            return cur.fetchone()['id']
#exam
def initExam():
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
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO exam_question (question, options, correct_answer, created_at, updated_at)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING id;
                """,
                (question, options, correct_answer, datetime.now(), datetime.now())
            )
            return cur.fetchone()['id']
#study guide
def initStudyGuide():
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
    with get_db_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO study_guide (topic, content, created_at, updated_at)
                VALUES (%s, %s, %s, %s)
                RETURNING id;
                """,
                (topic, content, datetime.now(), datetime.now())
            )
            return cur.fetchone()['id']
