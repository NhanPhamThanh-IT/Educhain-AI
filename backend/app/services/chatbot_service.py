from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
import os
from typing import List, Dict, AsyncGenerator, Any
from dotenv import load_dotenv
from app.database.chat_history import save_chat_history, get_recent_chat_history, format_chat_history
from pydantic import BaseModel, Field
from langchain_core.messages import AIMessageChunk
from langchain.callbacks.base import BaseCallbackHandler
from ..utils.agent_tools import GetKnowledgeTool, CreateQuizTool 


load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")


# Create tools
get_knowledge_tool = GetKnowledgeTool()
# create_quiz_tool = CreateQuizTool()
# create_study_guide_tool = CreateStudyGuideTool()
# create_exam_tool = CreateExamTool()

class CustomHandler(BaseCallbackHandler):
    """
    Lớp xử lý callback tùy chỉnh để theo dõi và xử lý các sự kiện trong quá trình chat
    """ 
    def __init__(self):
        super().__init__()
        self.tool_starts = []
        self.tool_ends = []
        self.tool_errors = []

    # def on_tool_start(self, serialized, input_str, **kwargs):
    #     """Called when a tool starts running."""
    #     print(f"Tool started: {serialized['name']} with input: {input_str}")
    #     self.tool_starts.append((serialized['name'], input_str))
    
    # def on_tool_end(self, output, **kwargs):
    #     """Called when a tool ends running."""
    #     print(f"Tool ended with output: {output}")
    #     self.tool_ends.append(output)
    
    # def on_tool_error(self, error, **kwargs):
    #     """Called when a tool errors."""
    #     print(f"Tool error: {error}")
    #     self.tool_errors.append(error)
        

def get_llm_and_agent() -> AgentExecutor:  # Phần prompt này nên làm riêng rồi import vào
    system_message = """Your name is SoftAI-Bot. You are a friendly and professional AI teacher. Your task is to help student for Question and Answering.

For general questions or greetings:
- Respond naturally without using any tools
- Be friendly and professional
- Keep responses concise and helpful

For educate-related questions:
1. When user asks about knowledge:
   - Use get_knowledge_tool tool to retrieval best match information
   - PARAMETERS (will be provided in the prompt by system) for get_knowledge_tool:
     * query: Required - The exact question or topic to search for
     * course_name: fetch from database and provided by the system
   - Present knowledge in a clear format
   - Example: get_knowledge_tool(query="What is photosynthesis?", course_name="Biology", mode = "naive", only_need_context=True)
   - IF no information found, respond with use your own knowledge and experience to answer the question

   
IMPORTANT RULES:
- Only use get_knowledge_tool when user asks for knowledge or information about a topic or subject matter (e.g., "What is the capital of France?") 

Example flow:
User: What is the capital of France?
Ambatublow: The capital of France is Paris.
"""

    chat = ChatOpenAI(
        temperature=0, 
        streaming=True, 
        model="gpt-4o", 
        api_key=OPENAI_API_KEY, 
        callbacks=[CustomHandler()]
    )   
    
    tools = [
        get_knowledge_tool,
        # create_quiz_tool
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

async def get_answer_stream(course_name: str, question: str, thread_id: str, course_id = str) -> AsyncGenerator[Dict, None]:
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

    # print(chat_history)
    
    # Biến lưu câu trả lời hoàn chỉnh
    final_answer = ""
    print(course_name + '\n' + question)
    
    # Stream từng phần của câu trả lời
    async for event in agent.astream_events(
        {
            "input": course_name + '\n' + question,
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
        save_chat_history(course_id = course_id, thread_id = thread_id, question = question,answer = final_answer)


if __name__ == "__main__":
    import asyncio
    
    async def test():
        # answer = get_answer_stream("hi", "test-session")
        # print(answer)
        course_name = "papers"
        question = "which OCR model used in paper? and why?"
        async for event in get_answer_stream(course_name, question, "Theme knowledge of paper", "354788cd-3eb4-484a-8c4f-691a78f61383"):
            print('event:', event)
        print('done')

        
    asyncio.run(test())

# API cho chatbot thì frontend gửi một cái là 
    # Params = {
    #     "course_name": "papers",
    #     "query": "which OCR model used in paper? and why?"
    # }
    
    # thread_id = "Theme knowledge of paper"
    # course_id = "354788cd-3eb4-484a-8c4f-691a78f61383"
