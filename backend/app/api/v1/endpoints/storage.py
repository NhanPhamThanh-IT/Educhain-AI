from app.database.study_guide import save_section, save_study_guide, save_subsection
from app.database.chat_history import save_chat_history
from app.database.course import save_course
from app.database.document import save_document, get_doc_id, delete_doc
from app.database.exam import save_exam
from app.database.quiz import save_quiz
from app.database.user_info import save_user_info
from fastapi import Response, HTTPException, status, Depends, APIRouter, Form
from typing import List, Dict, Optional
from uuid import UUID
from app.models.postgre_model import StudyGuide, ExamQuestion, Course, QuizQuestion, ChatHistory, Document  # Importing Pydantic models

router = APIRouter()


@router.post("/{course_id}/create_sg")
def process_study_guide(study_guide_info: StudyGuide, course_id: UUID) -> bool:
    study_guide_id = save_study_guide(course_id)['study_guide']['id']
    section_id = save_section(study_guide_id, study_guide_info.content[0]['topic'])['id']
    for section in study_guide_info.content:
        sub_id = save_subsection(section_id, section["name"], section["content"])
    return True if study_guide_id and section_id and sub_id else False

def process_exam(exam_info: ExamQuestion, course_id: UUID) -> bool: 
    exam_id = save_exam(course_id, exam_info.question, exam_info.options, exam_info.correct_answer)
    return True if exam_id else False

@router.post("/{user_id}/create_course")
def process_course(user_id: int, course_info: Course) -> bool:
    course = save_course(user_id, course_info.name, course_info.category, course_info.introduction,
                            course_info.description)
    return course['id'] if course else False

@router.post("/{course_id}/create_doc")
def create_document(course_id: UUID, doc: Document):
    try:
        doc_info = save_document(course_id, doc.type_doc, doc.url)
        return doc_info["doc"] 
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/document/{doc_id}")
def read_document(doc_id: int):
    doc_info = get_doc_id(doc_id)
    if not doc_info:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc_info

@router.delete("/document/{doc_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_document(doc_id: int):
    if not delete_doc(doc_id):
        raise HTTPException(status_code=404, detail="Document not found")
    return {"message": "Document deleted successfully"}

@router.post("/{course_id}")
def process_chat_history(course_id: UUID, chat_info: ChatHistory) -> bool:
    chat_id = save_chat_history(course_id, chat_info.thread_id, chat_info.question, chat_info.answer)
    return True if chat_id else False

@router.post("/{course_id}/create_quiz")
def process_quiz(course_id: UUID, quiz_info: QuizQuestion) -> bool:
    quiz_id = save_quiz(course_id, quiz_info.question, quiz_info.options, quiz_info.correct_answer)
    return True if quiz_id else False
