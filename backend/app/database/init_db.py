# app/database/init_db.py
from app.database.chat_history import init_chat_history_table
from app.database.course import init_course
from app.database.document import init_document
from app.database.exam import init_exam
from app.database.quiz import init_quiz
from app.database.study_guide import init_study_guide
from app.database.user_info import init_user_info

def initialize_database():
    """Gọi tất cả các hàm khởi tạo bảng"""
    init_user_info()
    init_course()
    init_quiz()
    init_exam()
    init_study_guide()
    init_document()
    init_chat_history_table()

    print("Database tables initialized successfully")
