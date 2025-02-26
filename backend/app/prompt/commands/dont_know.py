from typing import TypedDict

class DontKnow(TypedDict):
    explanation: str

DONT_KNOW_RESPONSE_DESCRIPTION = "The user doesn't know the answer to the question. Explain it to them."
DONT_KNOW_RESPONSE_FORMAT = {
    "explanation": "string: <explanation>"
}
DONT_KNOW_PROMPT_CONTENT = "I don't know."

DONT_KNOW_COMMAND = {
    "response_tag": "DONT_KNOW",
    "response_description": DONT_KNOW_RESPONSE_DESCRIPTION,
    "response_formatting": DONT_KNOW_RESPONSE_FORMAT,
    "prompt_tag": "DONT_KNOW",
    "prompt_content": DONT_KNOW_PROMPT_CONTENT,
    "prompt_type": "DONT_KNOW"
}

# Example usage:
# print(DONT_KNOW_COMMAND)
