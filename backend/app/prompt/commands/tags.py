# Define suffixes
QUESTION_RESPONSE_TAG_SUFFIX = "Question"
PROMPT_TAG_SUFFIX = "Prompt"

# Define response tags as an Enum
from enum import Enum

class ResponseTags(Enum):
    MULTIPLE_CHOICE = f"Multiple Choice {QUESTION_RESPONSE_TAG_SUFFIX}"
    TRUE_FALSE = f"True False {QUESTION_RESPONSE_TAG_SUFFIX}"
    SHORT_ANSWER = f"Short Answer {QUESTION_RESPONSE_TAG_SUFFIX}"
    UNDERSTANDING = f"Understanding {QUESTION_RESPONSE_TAG_SUFFIX}"
    APPLICATION = f"Application {QUESTION_RESPONSE_TAG_SUFFIX}"
    ANSWER_CORRECTNESS = "Answer Correctness Response"
    HINT = "Hint Response"
    PLAIN_TEXT = "Plain Text Response"
    DONT_KNOW = "Don't Know Response"
    NEXT_TOPIC = "Next Topic Response"

# Define command tags as an Enum
class CommandTags(Enum):
    MULTIPLE_CHOICE = f"Multiple Choice {PROMPT_TAG_SUFFIX}"
    TRUE_FALSE = f"True False {PROMPT_TAG_SUFFIX}"
    SHORT_ANSWER = f"Short Answer {PROMPT_TAG_SUFFIX}"
    UNDERSTANDING = f"Understanding {PROMPT_TAG_SUFFIX}"
    APPLICATION = f"Application {PROMPT_TAG_SUFFIX}"
    ANSWER_CORRECTNESS = f"Answer Correctness {PROMPT_TAG_SUFFIX}"
    HINT = f"Hint {PROMPT_TAG_SUFFIX}"
    STUDY_GUIDE = f"Study Guide {PROMPT_TAG_SUFFIX}"
    PLAIN_TEXT = f"Plain Text {PROMPT_TAG_SUFFIX}"
    DONT_KNOW = f"Don't Know {PROMPT_TAG_SUFFIX}"

# Example usage:
print(ResponseTags.MULTIPLE_CHOICE.value)  # Output: "Multiple Choice Question"
print(CommandTags.HINT.value)              # Output: "Hint Prompt"
