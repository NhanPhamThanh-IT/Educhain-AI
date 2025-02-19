# Define tools like get_knowledge_tool, create_quiz_tool, create_study_guide_tool, create_exam_tool, etc.
# In backend/app/services/agent_tools.py.
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Optional, Dict, Annotated

# Này t ghi đại, tức là mình sẽ traverse knowledge graph để lấy thông tin
from backend.app.database.lightrag_usage import traverse_knowledge_graph, get_quiz_questions, get_study_guide, get_exam_questions 
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
        result = traverse_knowledge_graph(kwargs["topic"])
        
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
        result = get_quiz_questions(kwargs["topic"])
        
        return result
    
class CreateStudyGuideTool(BaseTool):
    """
    Tool tạo bài học
    """
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def execute(self, **kwargs) -> Dict:
        """
        Hàm thực thi tool
        """
        # Lấy bài học
        result = get_study_guide(kwargs["topic"])
        
        return result
    
class CreateExamTool(BaseTool):
    """
    Tool tạo đề thi
    """
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        
    def execute(self, **kwargs) -> Dict:
        """
        Hàm thực thi tool
        """
        # Lấy đề thi
        result = get_exam_questions(kwargs["topic"])
        
        return result
    
