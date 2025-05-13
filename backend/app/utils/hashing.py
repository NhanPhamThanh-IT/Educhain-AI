def hash_course_name(course_name: str) -> str:
    course_name = course_name.replace(" ", "").lower()
    
    def shift_char(c):
        if 'a' <= c <= 'z':
            return chr(((ord(c) - ord('a') + 3) % 26) + ord('a'))
        return c  
    
    hashed_name = "".join(shift_char(c) for c in course_name)
    
    return hashed_name  