from typing import TypedDict

class TrueFalseQuestion(TypedDict):
    question: str
    answer: bool

TRUE_FALSE_RESPONSE_DESCRIPTION = (
    "True/False questions should be carefully designed to test the user's understanding of the topic. "
    "The question should not be a trivial fact but should require the user to think critically. "
    "Avoid ambiguous statements, and ensure that the correct answer is clearly either 'True' or 'False'. "
    "DO NOT include explanations in the answer field—only provide 'True' or 'False'."
)

TRUE_FALSE_RESPONSE_FORMATTING = {
    "question": "string: <true/false question>?",
    "answer": "boolean: <True/False>"
}

def true_false_prompt_content(topic: str) -> str:
    return f"Ask me a true/false question about {topic} according to the notes in the first system prompt."

def true_false_command(topic: str) -> dict:
    return {
        "response_tag": "TRUE_FALSE",
        "response_description": TRUE_FALSE_RESPONSE_DESCRIPTION,
        "response_formatting": TRUE_FALSE_RESPONSE_FORMATTING,
        "prompt_tag": "TRUE_FALSE",
        "prompt_content": true_false_prompt_content(topic),
        "prompt_type": "TRUE_FALSE"
    }

# Example usage:
topic = "artificial intelligence"
print(true_false_command(topic))
