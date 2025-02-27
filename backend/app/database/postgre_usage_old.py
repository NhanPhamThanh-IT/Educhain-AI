import os
from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.future import select
from decimal import Decimal

from app.models import UserInfo, Course, ChatHistory, QuizQuestion, ExamQuestion, StudyGuide

DATABASE_URL = "postgresql+asyncpg://admintu:educhain123@@educhain.postgres.database.azure.com:5432/postgres"

# Khởi tạo engine kết nối với Azure PostgreSQL
engine = create_async_engine(DATABASE_URL, echo=True)

# Tạo session factory
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)

# Base class cho các model SQLAlchemy
Base = declarative_base()

# Hàm tạo session
async def get_db():
    async with AsyncSessionLocal() as session:
        yield session


# ----------------- UserInfo Functions -----------------
async def creUser(db: AsyncSession, user: UserInfo):
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user


async def getUserId(db: AsyncSession, user_id: str) -> Optional[UserInfo]:
    result = await db.execute(select(UserInfo).where(UserInfo.user_id == user_id))
    return result.scalars().first()


async def upUserToken(db: AsyncSession, user_id: str, edutoken: Decimal, learntoken: Decimal):
    user = await get_user_by_id(db, user_id)
    if user:
        user.edutoken += edutoken
        user.learntoken += learntoken
        user.updated_at = datetime.now()
        await db.commit()
        return user
    return None

async def upUserInfo(db: AsyncSession, user_id: str, fullname: str, nickname:str, gender:str, country:str, address:str, phonenumber:str):
    user = await get_user_by_id(db, user_id)
    if user:
        user.fullname = fullname
        user.nickname = nickname
        user.gender = gender
        user.country = country
        user.address = address
        user.phonenumber = phonenumber
        user.updated_at = datetime.now()
        await db.commit()
        return user
    return None


async def delUser(db: AsyncSession, user_id: str):
    user = await get_user_by_id(db, user_id)
    if user:
        await db.delete(user)
        await db.commit()
    return user


# ----------------- Course Functions -----------------
async def creCourse(db: AsyncSession, course: Course):
    db.add(course)
    await db.commit()
    await db.refresh(course)
    return course


async def getCourseId(db: AsyncSession, course_id: str) -> Optional[Course]:
    result = await db.execute(select(Course).where(Course.course_id == course_id))
    return result.scalars().first()


async def getAllCourses(db: AsyncSession) -> List[Course]:
    result = await db.execute(select(Course))
    return result.scalars().all()


async def delCourse(db: AsyncSession, course_id: str):
    course = await get_course_by_id(db, course_id)
    if course:
        await db.delete(course)
        await db.commit()
    return course


# ----------------- Chat History Functions -----------------
async def saveHistory(db: AsyncSession, chat: ChatHistory):
    db.add(chat)
    await db.commit()
    await db.refresh(chat)
    return chat


async def getHistoryThread(db: AsyncSession, thread_id: str) -> List[ChatHistory]:
    result = await db.execute(select(ChatHistory).where(ChatHistory.thread_id == thread_id))
    return result.scalars().all()


# ----------------- QuizQuestion Functions -----------------
async def creQuiz(db: AsyncSession, quiz: QuizQuestion):
    db.add(quiz)
    await db.commit()
    await db.refresh(quiz)
    return quiz


async def getQuizCourse(db: AsyncSession, course_id: str) -> List[QuizQuestion]:
    result = await db.execute(select(QuizQuestion).where(QuizQuestion.course_id == course_id))
    return result.scalars().all()


# ----------------- ExamQuestion Functions -----------------
async def creExam(db: AsyncSession, exam: ExamQuestion):
    db.add(exam)
    await db.commit()
    await db.refresh(exam)
    return exam


async def getExamCourse(db: AsyncSession, course_id: str) -> List[ExamQuestion]:
    result = await db.execute(select(ExamQuestion).where(ExamQuestion.course_id == course_id))
    return result.scalars().all()


# ----------------- StudyGuide Functions -----------------
async def creStudyGuide(db: AsyncSession, guide: StudyGuide):
    db.add(guide)
    await db.commit()
    await db.refresh(guide)
    return guide


async def getStudyGuideTopic(db: AsyncSession, topic: str) -> Optional[StudyGuide]:
    result = await db.execute(select(StudyGuide).where(StudyGuide.topic == topic))
    return result.scalars().first()
