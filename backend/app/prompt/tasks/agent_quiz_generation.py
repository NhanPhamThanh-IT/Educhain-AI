from typing import List
from app.prompt import multiple_choice_command, short_answer_command, true_false_command
from app.prompt import dont_know, hints, understanding


class Task:
    def __init__(self, text: str):
        self.text = text

class Topic:
    def __init__(self, name: str):
        self.name = name


def get_quiz_prompt(topics: List[Topic], type: int, amount: int = 10) -> str:
    """
    Generate a prompt for quiz generation based on the provided topics and type.

    Args:
        topics (List[Topic]): List of topics for quiz generation.
        type (int): Type of quiz question (1: MULTIPLE_CHOICE, 2: SHORT_ANSWER, 3: TRUE_FALSE).
        amount (int): Number of questions to generate.
    """

    topics_list = "\n".join(f"{index + 1}) {topic.name}" for index, topic in enumerate(topics))
    
    # Call the appropriate question generation function
    if type == 1:
        quiz_question = multiple_choice_command(topics)
    elif type == 2:
        quiz_question = short_answer_command(topics)
    elif type == 3:
        quiz_question = true_false_command(topics)
    else:
        return "Error: Invalid question type. Please choose from MULTIPLE_CHOICE, SHORT_ANSWER, or TRUE_FALSE."

    return f"""
You are about to generate {amount} quiz {quiz_question["response_tag"]} question based on the following topics:

{topics_list}

## Quiz Question should be

{quiz_question["response_description"]}

## Quiz Question Format
{quiz_question["response_formatting"]}

"""



# Example usage
task_example = Task("Learn the basics of Python programming.")
topics_example = [Topic("Variables"), Topic("Loops"), Topic("Functions")]

print(get_quiz_prompt(task_example, topics_example, "MULTIPLE_CHOICE"))
