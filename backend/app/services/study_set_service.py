from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate
import os
from typing import List, Dict, Any
from dotenv import load_dotenv
from backend.app.database.chat_history import save_chat_history
from pydantic import BaseModel, Field
from langchain_core.messages import AIMessageChunk
from langchain.callbacks.base import BaseCallbackHandler
from ..utils.agent_tools import GetKnowledgeTool, CreateQuizTool, CreateStudyGuideTool, CreateExamTool

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Create tools
get_knowledge_tool = GetKnowledgeTool()
create_quiz_tool = CreateQuizTool()
create_study_guide_tool = CreateStudyGuideTool()
create_exam_tool = CreateExamTool()

class CustomHandler(BaseCallbackHandler):
    """
    Lớp xử lý callback tùy chỉnh để theo dõi và xử lý các sự kiện trong quá trình chat
    """
    def __init__(self):
        super().__init__()

def get_llm_and_study_set_agent() -> AgentExecutor:
    system_message = """You are a friendly and professional in study set creation. Your task is to help students create their study sets including quiz questions, study guides, and exams.
1. When user confirms create a quiz:
   - Use create_quiz_tool to generate a high-quality quiz
   - Present the quiz to the user
   - Tell them the quiz is ready in the study set and ask if they need anything else
   - If they show curiosity, ask for more details or offer to create a study guide or exam

2. When customer confirms create a study guide:
    - Use create_study_guide_tool to generate a high-quality study guide
    - Present the study guide to the user
    - Tell them the study guide is ready in the study set and ask if they need anything else
    - If they show curiosity, ask for more details or offer to create a quiz or exam

3. When customer confirms create an exam:
    - Use create_exam_tool to generate a high-quality exam
    - Present the exam to the user
    - Tell them the exam is ready in the study set and ask if they need anything else
    - If they show curiosity, ask for more details or offer to create a quiz or study guide
    
"""

    chat = ChatOpenAI(
        temperature=0,
        streaming=True,
        model="gpt-4o",
        api_key=OPENAI_API_KEY,
        callbacks=[CustomHandler()]
    )

    tools = [
        create_quiz_tool,
        create_study_guide_tool,
        create_exam_tool
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_message),
        ("human", "{input}")
    ])

    agent = create_openai_functions_agent(
        llm=chat,
        tools=tools,
        prompt=prompt
    )

    agent_executor = AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=False,
        return_intermediate_steps=True
    )

    return agent_executor

def get_study_set(type: str) -> Dict:
    """
    Hàm lấy câu trả lời cho một câu hỏi
    
    Args:
        question (str): Câu hỏi của người dùng
        thread_id (str): ID của cuộc trò chuyện
        
    Returns:
        str: Câu trả lời từ AI
    """
    agent = get_llm_and_study_set_agent()
    question = "" # Lấy từ Prompt
    
    # Get recent chat history

    result = agent.invoke({
        "input": question
    })
    
    # Save chat history to database
    if isinstance(result, dict) and "output" in result:
        save_chat_history(question, result["output"])
    
    return result