from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import os
from typing import List, Dict, AsyncGenerator, Any
from dotenv import load_dotenv
from app.database.chat_history_service import save_chat_history, get_recent_chat_history, format_chat_history
from pydantic import BaseModel, Field
from langchain_core.messages import AIMessageChunk
from langchain.callbacks.base import BaseCallbackHandler
from .agent_tools import GetKnowledgeTool, CreateQuizTool , CreateStudyGuideTool, CreateExamTool


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

def get_llm_and_agent() -> AgentExecutor:  # Phần prompt này nên làm riêng rồi import vào
    system_message = """You are a friendly and professional AI teacher. Your task is to help student for Question and Answering.

For general questions or greetings:
- Respond naturally without using any tools
- Be friendly and professional
- Keep responses concise and helpful

For product-related questions or purchase intentions:
1. When customer asks about products:
   - Use product_search tool to find product information
   - Present product details in a clear format
   - If they show interest in buying, ask for quantity

2. When customer confirms purchase quantity:
   - Use product_search again to get latest information
   - From the search result, get:
     + product_id 
     + price = result["price"]
   - Calculate total = price × quantity
   - Use create_order tool with:
     + user_id="user1"
     + product_id=<id from product_search>
     + quantity=<customer requested quantity>
     + total_amount=<price × quantity>
   - Handle insufficient funds or out of stock cases
   - Confirm successful order and payment deduction

3. When customer confirms payment:
   - Use update_order_status tool to set order status to "paid"
   - Confirm successful payment to customer

IMPORTANT RULES:
- Only use product_search when questions are about products or purchases
- NEVER use product_id without getting it from product_search result first
- All product information (id, price, etc.) MUST come from latest product_search result
- Format money amounts in VND format (e.g., 31,990,000 VND)

Example flow:
1. Customer: "I want to buy Samsung S24"
2. Bot: 
   - Call product_search("Samsung S24")
   - Result: {{"id": 2, "name": "Samsung S24", "price": 31990000, ...}}
   - Show product info and ask quantity
3. Customer: "I want 1"
4. Bot: 
   - Call product_search("Samsung S24") again for latest info
   - From result: {{"id": 2, "price": 31990000}}
   - Call create_order with:
     user_id="user1"
     product_id=2        # From search result
     quantity=1
     total_amount=31990000  # price × quantity
   - Inform customer of the result"""
    
    chat = ChatOpenAI(
        temperature=0, 
        streaming=True, 
        model="gpt-4", 
        api_key=OPENAI_API_KEY,
        callbacks=[CustomHandler()]
    )
    
    tools = [
        get_knowledge_tool,
        create_quiz_tool,
        create_study_guide_tool,
        create_exam_tool
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
