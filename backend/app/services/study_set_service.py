from langchain.tools import BaseTool
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_openai_functions_agent
from langchain_core.prompts import ChatPromptTemplate
import os
from typing import List, Dict, Any
from dotenv import load_dotenv
from langchain_core.messages import AIMessageChunk
from langchain.callbacks.base import BaseCallbackHandler
from ..utils.agent_tools import  CreateQuizTool
from openai import 

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not found in environment variables")

# Use CreateQuizTool with prompt to call LLM to create quiz with topics to study, don't use agents
create_quiz_tool = CreateQuizTool()

class customHandler(BaseCallbackHandler):
    """
    Custom callback handler to track and process events during chat
    """ 
    def __init__(self):
        super().__init__()
        self.tool_starts = []
        self.tool_ends = []
        self.tool_errors = []
