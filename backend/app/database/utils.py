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

if __name__ == "__main__":
    # Initialize all tables when running directly
    init_user_info()
    init_course()
    init_quiz()
    init_exam()
    init_study_guide()
    init_document()
    init_chat_history_table()
    print("Database tables initialized successfully")