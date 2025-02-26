from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, List
from decimal import Decimal

class UserInfo(BaseModel):
    id: int
    fullname: str # Tên của người dùng
    nickname: str # Biệt danh của người dùng
    gender: str # Giới tính của người dùng
    country: str # Quốc gia của người dùng
    address: str # Địa chỉ của người dùng
    phonenumber: str # Số điện thoại của người dùng
    edutoken: Decimal # Tiền edutoken trong tài khoản]
    learntoken: Decimal # Tiền learntoken trong tài khoản
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class Course(BaseModel):
    id: int
    name: str # Tên của khóa học
    category: str # Danh mục của khóa học
    introduction: str # Giới thiệu về khóa học
    description: str # Mô tả của khóa học
    price: Decimal # Giá của khóa học

    learning_materials_path: str # Đường dẫn tới tài liệu học
    lesson: List[str] # Danh sách các bài học
    QuizQuestion: List[int] # Danh sách các câu hỏi trắc nghiệm
    ExamQuestion: List[int] # Danh sách các câu hỏi thi cuối khóa
    Video: List[str] # Danh sách các video hướng dẫn

    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class ChatHistory(BaseModel):
    id: int # ID của tin nhắn
    thread_id: str # ID của cuộc trò chuyện
    question: str # Câu hỏi của người dùng
    answer: str # Câu trả lời của chatbot
    created_at: datetime = Field(default_factory=datetime.now)


class QuizQuestion(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class ExamQuestion(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class StudyGuide(BaseModel):
    id: int
    topic: str # Chủ đề của bài học
    content: str # Nội dung của bài học
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)