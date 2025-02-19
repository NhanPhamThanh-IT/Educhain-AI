from typing import TypedDict

class Hint(TypedDict):
    hint: str

HINT_RESPONSE_DESCRIPTION = (
    "Hints should be helpful but should not give away the answer. "
    "Do NOT provide too much information as the user should still be able to solve the problem on their own."
)
HINT_RESPONSE_FORMAT = {
    "hint": "string: <hint>"
}
HINT_PROMPT_CONTENT = "Please provide a hint for the user."

HINT_COMMAND = {
    "response_tag": "HINT",
    "response_description": HINT_RESPONSE_DESCRIPTION,
    "response_formatting": HINT_RESPONSE_FORMAT,
    "prompt_tag": "HINT",
    "prompt_content": HINT_PROMPT_CONTENT,
    "prompt_type": "HINT"
}

# Example usage:
print(HINT_COMMAND)
