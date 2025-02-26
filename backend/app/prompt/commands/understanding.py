from enum import Enum
from typing import Dict, Callable

# Define Enums for ResponseTags and CommandTags
class ResponseTags(Enum):
    UNDERSTANDING = "Understanding Question"

class CommandTags(Enum):
    UNDERSTANDING = "Understanding Prompt"

class CommandTypes(Enum):
    TEXT_BASED = "Text-Based"

# Define the response description
understanding_response_description = (
    "Text-based understanding questions should ask the user to demonstrate their "
    "understanding of the topics covered in their notes. They should be able to explain "
    "the concepts and why they are relevant."
)

# Define the response formatting
response_formatting: Dict[str, str] = {
    "question": "string: <question>?"
}

# Function to generate prompt content dynamically
def prompt_content(topic: str) -> str:
    return f"Please ask me an understanding question about {topic}"

# Define the understanding question command function
def understanding_question_command(topic: str) -> Dict:
    return {
        "responseTag": ResponseTags.UNDERSTANDING.value,
        "responseDescription": understanding_response_description,
        "responseFormatting": response_formatting,
        "promptTag": CommandTags.UNDERSTANDING.value,
        "promptContent": prompt_content(topic),
        "promptType": CommandTypes.TEXT_BASED.value
    }

# Example usage
example_command = understanding_question_command("Physics")
print(example_command)
