from app.services.course_services import create_course, get_course, get_all_courses, delete_course
from fastapi import APIRouter, HTTPException, Depends


router = APIRouter()

class CourseCreateRequest:
    user_id: int
    course_name: str
    category: str
    introduction: str
    description: str

@router.post("/create")
async def create_course(request: CourseCreateRequest):
    try:
        course = await create_course(
            request.user_id,
            request.course_name,
            request.category,
            request.introduction,
            request.description
        )
        return {"course": course}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

@router.get("/{course_id}")
async def get_course(course_id: str):
    try:
        course = await get_course(course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/all/{user_id}")
async def get_all_courses(user_id: str):
    try:
        courses = await get_all_courses(user_id)
        return courses
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
