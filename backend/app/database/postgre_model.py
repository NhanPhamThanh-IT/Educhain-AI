from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class UserInfo(BaseModel):
    id: int
    user_id: str # ID của người dùng
    fullname: str # Tên của người dùng
    nickname: str # Biệt danh của người dùng
    gender: str # Giới tính của người dùng
    country: str # Quốc gia của người dùng
    address: str # Địa chỉ của người dùng
    phonenumber: str # Số điện thoại của người dùng
    edutoken: Decimal # Tiền edutoken trong tài khoản]
    learntoken: Decimal # Tiền learntoken trong tài khoản
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now() 

class Course(BaseModel):
    id: int
    course_id: str # ID của khóa học
    name: str # Tên của khóa học
    category: str # Danh mục của khóa học
    introduction: str # Giới thiệu về khóa học
    learning_materials_path: str # Đường dẫn tới tài liệu học
    description: str # Mô tả của khóa học
    price: Decimal # Giá của khóa học
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class ChatHistory(BaseModel):
    id: int # ID của tin nhắn
    thread_id: str # ID của cuộc trò chuyện
    question: str # Câu hỏi của người dùng
    answer: str # Câu trả lời của chatbot
    created_at: datetime = datetime.now()



