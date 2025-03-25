from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional, List, Dict
from decimal import Decimal

class UserInfo(BaseModel):
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
    name: str # Tên của khóa học
    category: str # Danh mục của khóa học
    introduction: str # Giới thiệu về khóa học
    description: str # Mô tả của khóa học
    learning_materials_path: Optional[str] = None 
    lesson: Optional[List[str]] = None 
    QuizQuestion: Optional[List[int]] = None 
    ExamQuestion: Optional[List[int]] = None 
    Video: Optional[List[str]] = None  
    ChatThreads: Optional[List[str]] = None 
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)


class ChatHistory(BaseModel):
    thread_id: str # ID của cuộc trò chuyện
    question: str # Câu hỏi của người dùng
    answer: str # Câu trả lời của chatbot
    created_at: datetime = Field(default_factory=datetime.now)

class Document(BaseModel):
    type: str
    url: str
    created_at: datetime
    updated_at: datetime


class QuizQuestion(BaseModel):
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class ExamQuestion(BaseModel):
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

class StudyGuide(BaseModel):
    content: List[Dict]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

