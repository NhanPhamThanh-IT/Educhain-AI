# Define tools like get_knowledge_tool, create_quiz_tool, create_study_guide_tool, create_exam_tool, etc.
# In backend/app/services/agent_tools.py.
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Optional, Dict, Annotated

# Này t ghi đại, tức là mình sẽ traverse knowledge graph để lấy thông tin
from app.database.lightrag_usage import lr_naive_query, lr_create_quiz, lr_local_query, lr_insert_knowledge
from decimal import Decimal

class GetKnowledgeTool(BaseTool):
    """
    Tool lấy thông tin từ knowledge graph
    """
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def execute(self, **kwargs) -> Dict:
        """
        Hàm thực thi tool
        """
        # Lấy thông tin từ knowledge graph
        result = lr_naive_query(query=kwargs["query"])
        
        return result
    
class CreateQuizTool(BaseTool):
    """
    Tool tạo câu hỏi trắc nghiệm
    """
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def execute(self, **kwargs) -> Dict:
        """
        Hàm thực thi tool
        """
        # Lấy câu hỏi trắc nghiệm
        result = lr_create_quiz(kwargs["topic"])
        
        return result
    
# class CreateStudyGuideTool(BaseTool):
#     """
#     Tool tạo bài học
#     """
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
        
#     def execute(self, **kwargs) -> Dict:
#         """
#         Hàm thực thi tool
#         """
#         # Lấy bài học
#         result = get_study_guide(kwargs["topic"])
        
#         return result
    
# class CreateExamTool(BaseTool):
#     """
#     Tool tạo đề thi
#     """
#     def __init__(self, **kwargs):
#         super().__init__(**kwargs)
        
#     def execute(self, **kwargs) -> Dict:
#         """
#         Hàm thực thi tool
#         """
#         # Lấy đề thi
#         result = get_exam_questions(kwargs["topic"])
        
#         return result
    
