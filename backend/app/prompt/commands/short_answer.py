from typing import TypedDict

class ShortAnswerQuestion(TypedDict):
    question: str
    answer: str

SHORT_ANSWER_RESPONSE_DESCRIPTION = (
    "Short answer questions should be clear and require the user to demonstrate understanding of the topic concisely. "
    "The question should not be a simple yes/no question or a direct definition but should encourage the user to apply their knowledge in a short, well-structured response. "
    "Ensure that the correct answer is precise, factual, and not open-ended. "
    "DO NOT include any explanation in the answer field—only provide the exact expected response."
)

SHORT_ANSWER_RESPONSE_FORMATTING = {
    "question": "string: <question>?",
    "answer": "string: <expected short answer>"
}

def short_answer_prompt_content(topic: str) -> str:
    return f"Ask me a short answer question about {topic} according to the notes in the first system prompt."

def short_answer_command(topic: str) -> dict:
    return {
        "response_tag": "SHORT_ANSWER",
        "response_description": SHORT_ANSWER_RESPONSE_DESCRIPTION,
        "response_formatting": SHORT_ANSWER_RESPONSE_FORMATTING,
        "prompt_tag": "SHORT_ANSWER",
        "prompt_content": short_answer_prompt_content(topic),
        "prompt_type": "SHORT_ANSWER"
    }

# Example usage:
topic = "data science"
print(short_answer_command(topic))
