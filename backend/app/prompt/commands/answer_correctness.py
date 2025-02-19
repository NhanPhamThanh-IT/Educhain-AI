from typing import TypedDict

class AnswerCorrectness(TypedDict):
    correct: bool
    explanation: str

ANSWER_CORRECTNESS_RESPONSE_TAG = "Answer Correctness"
ANSWER_CORRECTNESS_RESPONSE_DESCRIPTION = (
    "Please respond by saying whether the user has answered correctly and explain why. "
    "Speak in the second person. Provide an explanation of the correct answer if the user's answer is incorrect. "
    "The question asked is as follows: "
)

ANSWER_CORRECTNESS_RESPONSE_FORMATTING = {
    "correct": "boolean: <true/false>",
    "explanation": "string: <explanation>"
}

ANSWER_CORRECTNESS_DEFAULTS = {
    "response_tag": "ANSWER_CORRECTNESS",
    "response_description": ANSWER_CORRECTNESS_RESPONSE_DESCRIPTION,
    "response_formatting": ANSWER_CORRECTNESS_RESPONSE_FORMATTING,
    "prompt_tag": "ANSWER_CORRECTNESS",
    "prompt_type": "REGULAR",
    "prompt_content": ""
}

def answer_correctness_command(question: str, answer: str) -> dict:
    return {
        **ANSWER_CORRECTNESS_DEFAULTS,
        "response_description": ANSWER_CORRECTNESS_RESPONSE_DESCRIPTION + question,
        "prompt_content": answer
    }

# Example usage:
question = "What is the capital of France?"
answer = "Berlin"
print(answer_correctness_command(question, answer))
