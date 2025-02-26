from enum import Enum
from typing import Dict, Callable

# Define Enums for ResponseTags and CommandTags
class ResponseTags(Enum):
    APPLICATION = "Application Question"

class CommandTags(Enum):
    APPLICATION = "Application Prompt"

class CommandTypes(Enum):
    TEXT_BASED = "Text-Based"

# Define the response description
response_description = (
    "Text-based application questions should ask the user to apply the concepts "
    "covered in their notes. They should be able to demonstrate their understanding "
    "of the concepts by applying them to a new situation. Create examples or practice "
    "problems based on the concepts covered in the notes. Do NOT include any indication of the answer."
)

# Define the response formatting
response_formatting: Dict[str, str] = {
    "question": "string: <question>?"
}

# Define the prompt content
prompt_content = "Please ask me an application question"

# Define the application question command function
def application_question_command(topic: str) -> Dict:
    return {
        "responseTag": ResponseTags.APPLICATION.value,
        "responseDescription": response_description,
        "responseFormatting": response_formatting,
        "promptTag": CommandTags.APPLICATION.value,
        "promptContent": prompt_content,
        "promptType": CommandTypes.TEXT_BASED.value
    }

# Example usage
example_command = application_question_command("Mathematics")
print(example_command)
