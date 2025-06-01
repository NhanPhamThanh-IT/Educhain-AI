from app.database.course import save_course, init_course, get_course_id, get_course_all, get_quiz

async def create_course(user_id: int, course_name:str, category:str, introduction:str, description:str):
    """
    Create a new course and initialize it in the database.
    
    Args:
        user_id (int): ID of the user creating the course.
        course_name (str): Name of the course.
        category (str): Category of the course.
        introduction (str): Introduction text for the course.
        description (str): Detailed description of the course.
        
    Returns:
        Dict: The created course details.
    """
    # Save course to database
    course = save_course(user_id, course_name, category, introduction, description)
    
    # Initialize course in database
    init_course(course['id']) 
    
    return {"course": course}

async def get_course(course_id: str):
    """
    Retrieve course details by course ID.
    
    Args:
        course_id (str): ID of the course to retrieve.
        
    Returns:
        Dict: Course details if found, otherwise None.
    """
    course = get_course_id(course_id)
    return {"course": course} if course else None

async def get_all_courses(user_id: str):    
    """
    Retrieve all courses for the user.
    
    Returns:
        List[Dict]: List of all courses.
    """
    courses = get_course_all(user_id)
    return {"courses": courses} if courses else []


async def delete_course(course_id: str):
    """
    Delete a course by its ID.
    
    Args:
        course_id (str): ID of the course to delete.
        
    Returns:
        Dict: Confirmation message if successful, otherwise None.
    """
    # This function should implement the logic to delete a course from the database
    # For now, we return a placeholder message
    return {"message": f"Course with ID {course_id} deleted successfully."}

async def get_quiz(course_id: str):
    """
    Retrieve quiz questions for a specific course.
    
    Args:
        course_id (str): ID of the course to retrieve quiz questions for.
        
    Returns:
        Dict: Quiz questions if found, otherwise None.
    """
    quiz = get_quiz(course_id)
    return {"quiz": quiz} if quiz else None

