# Define tools like get_knowledge_tool, create_quiz_tool, create_study_guide_tool, create_exam_tool, etc.
# In backend/app/services/agent_tools.py.
from langchain.tools import BaseTool
from pydantic import BaseModel, Field
from typing import Optional, Dict, Annotated, List

# Này t ghi đại, tức là mình sẽ traverse knowledge graph để lấy thông tin
from app.utils.lightrag_functions import query_rag, query_rag_quiz
from decimal import Decimal

class GetKnowledgeInput(BaseModel):
    query: str = Field(..., title="Query", description="Query to get information from knowledge graph")
    course_name: Optional[str] = Field(None, title="Course Name", description="Name of the course to query")
    mode: Optional[str] = Field("naive", title="Query Mode", description="Query mode ('naive', 'local', 'global', or 'hybrid')")
    only_need_context: Optional[bool] = Field(False, title="Only Need Context", description="Whether to return only the context")

class CreateQuizInput(BaseModel):
    # List of topics to create quiz for
    topic: List[str] = Field(..., title="Topic", description="List of topics to create quiz for")
    course_name: Optional[str] = Field(None, title="Course Name", description="Name of the course to create quiz for")
    mode: Optional[str] = Field("global", title="Query Mode", description="Query mode ('naive', 'local', 'global', or 'hybrid')")

class GetKnowledgeTool(BaseTool):
    """
    Tool lấy thông tin từ knowledge graph
    """
    name: Annotated[str, Field(description="Tool name")] = "get_knowledge_tool"
    description: Annotated[str, Field(description="Tool description")] = "Tool for search information in knowledge graph"
    args_schema: type[BaseModel] = GetKnowledgeInput

    async def _arun(self, query: str, course_name: Optional[str] = None, 
             mode: str = "naive", only_need_context: bool = True) -> Dict:
        """
        Run the tool to query the knowledge graph
        
        Args:
            query: The query string to search for
            course_name: Optional name of the course to query
            mode: Query mode ('naive', 'local', 'global', or 'hybrid')
            only_need_context: Whether to return only the context
            
        Returns:
            Dictionary containing the query results
        """
        result = await query_rag(
            query=query,
            course_name=course_name,
            mode=mode,
            only_need_context=only_need_context
        )
        return result
    
    def _run(self, query: str, course_name: Optional[str] = None, 
             mode: str = "naive", only_need_context: bool = True) -> Dict:
        """
        Synchronous run method - calls the async version
        """
        import asyncio
        return asyncio.run(self._arun(query, course_name, mode, only_need_context))

class CreateQuizTool(BaseTool):
    """
    Tool tạo quiz
    """
    name: Annotated[str, Field(description="Tool name")] = "create_quiz_tool"
    description: Annotated[str, Field(description="Tool description")] = "Tool for creating quiz"
    args_schema: type[BaseModel] = CreateQuizInput

    async def _arun(self, topic: List[str], course_name: Optional[str] = None, 
             mode: str = "global") -> Dict:
        """
        Run the tool to create a quiz
        
        Args:
            topic: List of topics to create quiz for
            course_name: Optional name of the course to create quiz for
            mode: Query mode ('naive', 'local', 'global', or 'hybrid')
            
        Returns:
            Dictionary containing the quiz results
        """
        result = await query_rag_quiz(
            query=topic,
            course_name=course_name,
            mode=mode
        )
        return result
    
    def _run(self, topic: List[str], course_name: Optional[str] = None, 
             mode: str = "global") -> Dict:
        """
        Synchronous run method - calls the async version
        """
        import asyncio
        return asyncio.run(self._arun(topic, course_name, mode))
    
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
    
