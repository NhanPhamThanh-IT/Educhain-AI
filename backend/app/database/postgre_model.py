from datetime import datetime
from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal

class UserInfo(BaseModel):
    id: int
    user_id: str # ID của người dùng
    balance: Decimal # Tiền trong tài khoản
    created_at: datetime = datetime.now()
    updated_at: datetime = datetime.now() 

class ChatHistory(BaseModel):
    id: int
    thread_id: str
    question: str
    answer: str
    created_at: datetime = datetime.now()



