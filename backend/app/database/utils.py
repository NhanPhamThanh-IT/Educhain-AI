from app.database.study_guide import save_section, save_study_guide, save_subsection
from app.database.chat_history import save_chat_history
from app.database.course import save_course
from app.database.document import save_documnet
from app.database.exam import save_exam
from app.database.quiz import save_quiz
from app.database.user_info import save_user_info

from typing import List, Dict, Optional

def compute_course_id(course_name:str, user_id:int) -> str:
    return hash(course_name, str(user_id))

def process_study_guide(study_guide_info: Dict, course_id: int) -> bool:
    study_guide_id = save_study_guide(course_id)['study_guide']['id']
    section_id = save_section(study_guide_id, study_guide_info['topic'])['section']['id']
    sub_id = save_subsection(section_id,study_guide_info['section']['name'],study_guide_info['section']['content'])
    return True if study_guide_id and section_id and sub_id else False

def process_exam(exam_info: Dict, course_id: int) -> bool: 
    exam_id = save_exam(course_id,exam_info['question'],exam_info['options'],exam_info['correct_answer'])
    return True if exam_id else False
def process_course(user_id: int, course_info:Dict) -> bool:
    course_id = save_course(user_id,course_info['name'],course_info['category'],course_info['intro'],course_info['des'],course_info['price'])
    return True if course_id else False

def process_document():
    pass

def process_chat_history(thread_id:int, chat_info: Dict)->bool:
    chat_id = save_chat_history(thread_id,chat_info['ques'],chat_info['ans'])
    return True if chat_id else False