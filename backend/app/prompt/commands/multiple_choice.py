from typing import TypedDict, Dict, Callable

class MultipleChoiceQuestion(TypedDict):
    question: str
    options: Dict[str, str]  # {"A": "Option A", "B": "Option B", "C": "Option C", "D": "Option D"}
    answer: str  # "A", "B", "C", or "D"

MULTIPLE_CHOICE_RESPONSE_DESCRIPTION = (
    "Multiple choice questions should be challenging and force the user to demonstrate understanding of the topic. "
    "They SHOULD NOT simply be a definition or a fact. They should be a question that requires the user to think about the topic and apply their knowledge. "
    "Feel free to use examples of scenarios or practice examples to help the user understand the topic better. "
    "Ensure there are no ambiguities in the answers, meaning there is ONLY ONE correct answer to the problem. "
    "DO NOT include any explanation of the correct answer. The question should only be the question itself and should not have the options listed. "
    "The options should be listed separately. The answer should be the letter of the correct answer. "
    "For example, if the correct answer is 'A', the answer should be 'A'."
)

MULTIPLE_CHOICE_RESPONSE_FORMATTING = {
    "question": "string: <question>?",
    "options": {
        "A": "string",
        "B": "string",
        "C": "string",
        "D": "string"
    },
    "answer": "string: <A/B/C/D>"
}

def multiple_choice_prompt_content(topic: str) -> str:
    return f"Ask me a multiple choice question about {topic} according to the notes in the first system prompt."

def multiple_choice_command(topic: str) -> dict:
    return {
        "response_tag": "MULTIPLE_CHOICE",
        "response_description": MULTIPLE_CHOICE_RESPONSE_DESCRIPTION,
        "response_formatting": MULTIPLE_CHOICE_RESPONSE_FORMATTING,
        "prompt_tag": "MULTIPLE_CHOICE",
        "prompt_content": multiple_choice_prompt_content(topic),
        "prompt_type": "MULTIPLE_CHOICE"
    }



# Example usage:
topic = "machine learning"
print(multiple_choice_command(topic))
