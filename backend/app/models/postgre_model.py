from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class UserInfo(BaseModel):
    id: int # ID của người dùng
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
    id: int # ID của khóa học
    name: str # Tên của khóa học
    category: str # Danh mục của khóa học
    introduction: str # Giới thiệu về khóa học
    description: str # Mô tả của khóa học
    price: Decimal # Giá của khóa học

    learning_materials_path: str # Đường dẫn tới tài liệu học
    lessons: List[str] # Danh sách các bài học
    quiz_id_list: List[int] # Danh sách các câu hỏi trắc nghiệm
    exam_id_list: List[int] # Danh sách các câu hỏi thi cuối khóa
    study_guide_id_list: List[int] # Danh sách các bài học hướng dẫn
    video_id_list: List[int] # Danh sách các video hướng dẫn

    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class Document(BaseModel):
    id: int # ID của tài liệu
    title: str # Tiêu đề của tài liệu
    type: str # Loại tài liệu
    url: str # Đường dẫn tới tài liệu
    created_at: datetime = datetime.now()

class ChatHistory(BaseModel):
    id: int # ID của tin nhắn
    thread_id: str 
    question: str # Câu hỏi của người dùng
    answer: str # Câu trả lời của chatbot

    created_at: datetime = datetime.now()


class QuizMultipleChoice(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class QuizTrueFalse(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi, 0 là bên trái 1 là bên phải
    correct_answer: bool # Đáp án đúng
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class QuizFillInBlank(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi
    correct_answer: str # Đáp án đúng
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()


class Exam(BaseModel):
    id: int
    question: str # Nội dung của câu hỏi
    options: List[str] # Danh sách các phương án
    correct_answer: str # Đáp án đúng
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class StudyGuide(BaseModel):
    id: int
    topic: List[str] # Chủ đề của bài học
    sub_topic: List[str] # Chủ đề phụ của bài học
    content: List[List[str]] # Nội dung của bài học
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now()

class LightRAG(BaseModel):
    id: int
    course_id: int  
    document_id: list[int]
    age_name: str # Dùng để truy vấn lightrag của cái document document đó hoặc của cả course
    
    created_at: datetime = datetime.now()

