from app.database.study_guide import save_section, save_study_guide, save_subsection
from app.database.chat_history import save_chat_history
from app.database.course import save_course
from app.database.document import save_documnet
from app.database.exam import save_exam
from app.database.quiz import save_quiz
from app.database.user_info import save_user_info
from fastapi import Response, HTTPException, status, Depends, APIRouter, Form
from typing import List, Dict, Optional
from uuid import UUID

def compute_course_id(course_name:str, user_id:int) -> str:
    return hash(course_name, str(user_id))

