from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import os
from typing import List, Dict, AsyncGenerator, Any
from dotenv import load_dotenv
from backend.app.database.chat_history import save_chat_history, get_recent_chat_history, format_chat_history
from pydantic import BaseModel, Field
from langchain_core.messages import AIMessageChunk
from langchain.callbacks.base import BaseCallbackHandler
from ..utils.agent_tools import GetKnowledgeTool, CreateQuizTool , CreateStudyGuideTool, CreateExamTool


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")


# Create tools
get_knowledge_tool = GetKnowledgeTool()
create_quiz_tool = CreateQuizTool()
# create_study_guide_tool = CreateStudyGuideTool()
# create_exam_tool = CreateExamTool()

class CustomHandler(BaseCallbackHandler):
    """
    Lớp xử lý callback tùy chỉnh để theo dõi và xử lý các sự kiện trong quá trình chat
    """
    def __init__(self):
        super().__init__()

def get_llm_and_agent() -> AgentExecutor:  # Phần prompt này nên làm riêng rồi import vào
    system_message = """Your name is Ambatublow. You are a friendly and professional AI teacher. Your task is to help student for Question and Answering.

For general questions or greetings:
- Respond naturally without using any tools
- Be friendly and professional
- Keep responses concise and helpful

For educate-related questions:
1. When user asks about knowledge:
   - Use get_knowledge_tool tool to retrieval best match information
   - Present knowledge in a clear format
   - If they show curiosity, ask for more details or offer to create a quiz, study guide, or exam

2. When user confirms create a quiz:
   - Use create_quiz_tool to get generate a high-quality quiz
   - Present the quiz to the user
   - Tell them quiz is ready in study set and ask if they need anything else
   - If they show curiosity, ask for more details or offer to create a study guide or exam

3. When customer confirms create a study guide:
    - Use create_study_guide_tool to generate a high-quality study guide
    - Present the study guide to the user
    - Tell them study guide is ready in study set and ask if they need anything else
    - If they show curiosity, ask for more details or offer to create a quiz or exam

4. When customer confirms create an exam:
    - Use create_exam_tool to generate a high-quality exam
    - Present the exam to the user
    - Tell them exam is ready in study set and ask if they need anything else
    - If they show curiosity, ask for more details or offer to create a quiz or study guide     

IMPORTANT RULES:
- Only use get_knowledge_tool when user asks for knowledge or information about a topic or subject matter (e.g., "What is the capital of France?") 
- Only use create_quiz_tool when user confirms they want to create a quiz
- Only use create_study_guide_tool when user confirms they want to create a study guide
- Only use create_exam_tool when user confirms they want to create an exam
- Always ask for more details or offer to create a quiz, study guide, or exam if user shows curiosity

Example flow:
User: What is the capital of France?
Ambatublow: The capital of France is Paris.
Ambatublow: Would you like me to create a quiz, study guide, or exam for you?
User: Create a quiz.
Ambatublow: Sure! I will create a quiz for you. Give me a moment.
Ambatublow: Here is your quiz: [quiz content]
Ambatublow: Your quiz is ready in the study set. Do you need anything else?
User: No, thank you.
Ambatublow: You're welcome! If you have any other questions, feel free to ask. Have a great day!

"""

    
    chat = ChatOpenAI(
        temperature=0, 
        streaming=True, 
        model="gpt-4", 
        api_key=OPENAI_API_KEY, 
        callbacks=[CustomHandler()]
    )   
    
    tools = [
        get_knowledge_tool,
        create_quiz_tool
        # create_study_guide_tool,
        # create_exam_tool
    ]

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_message),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
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



def get_answer(question: str, thread_id: str) -> Dict:
    """
    Hàm lấy câu trả lời cho một câu hỏi
    
    Args:
        question (str): Câu hỏi của người dùng
        thread_id (str): ID của cuộc trò chuyện
        
    Returns:
        str: Câu trả lời từ AI
    """
    agent = get_llm_and_agent()
    
    # Get recent chat history
    history = get_recent_chat_history(thread_id)
    chat_history = format_chat_history(history)

    result = agent.invoke({
        "input": question,
        "chat_history": chat_history
    })
    
    # Save chat history to database
    if isinstance(result, dict) and "output" in result:
        save_chat_history(thread_id, question, result["output"])
    
    return result


async def get_answer_stream(question: str, thread_id: str) -> AsyncGenerator[Dict, None]:
    """
    Hàm lấy câu trả lời dạng stream cho một câu hỏi
    
    Quy trình xử lý:
    1. Khởi tạo agent với các tools cần thiết
    2. Lấy lịch sử chat gần đây
    3. Gọi agent để xử lý câu hỏi
    4. Stream từng phần của câu trả lời về client
    5. Lưu câu trả lời hoàn chỉnh vào database
    
    Args:
        question (str): Câu hỏi của người dùng
        thread_id (str): ID phiên chat
        
    Returns:
        AsyncGenerator[str, None]: Generator trả về từng phần của câu trả lời
    """
    # Khởi tạo agent với các tools cần thiết
    agent = get_llm_and_agent()
    
    # Lấy lịch sử chat gần đây
    history = get_recent_chat_history(thread_id)
    chat_history = format_chat_history(history)
    
    # Biến lưu câu trả lời hoàn chỉnh
    final_answer = ""
    
    # Stream từng phần của câu trả lời
    async for event in agent.astream_events(
        {
            "input": question,
            "chat_history": chat_history,
        },
        version="v2"
    ):       
        # Lấy loại sự kiện
        kind = event["event"]
        # Nếu là sự kiện stream từ model
        if kind == "on_chat_model_stream":
            # Lấy nội dung token
            content = event['data']['chunk'].content
            if content:  # Chỉ yield nếu có nội dung
                # Cộng dồn vào câu trả lời hoàn chỉnh
                final_answer += content
                # Trả về token cho client
                yield content
    
    # Lưu câu trả lời hoàn chỉnh vào database
    if final_answer:
        save_chat_history(thread_id, question, final_answer)
