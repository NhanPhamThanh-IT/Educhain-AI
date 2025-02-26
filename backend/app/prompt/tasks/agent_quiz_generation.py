from typing import List
from app.prompt import multiple_choice_command, short_answer_command, true_false_command

class Task:
    def __init__(self, text: str):
        self.text = text

class Topic:
    def __init__(self, name: str):
        self.name = name

def get_quiz_prompt(task: Task, topics: List[Topic], type: int) -> str:
    topics_list = "\n".join(f"{index + 1}) {topic.name}" for index, topic in enumerate(topics))

    # Call the appropriate question generation function
    if type == 1:
        quiz_question = multiple_choice_command(task.text)
    elif type == 2:
        quiz_question = short_answer_command(task.text)
    elif type == 3:
        quiz_question = true_false_command(task.text)
    else:
        return "Error: Invalid question type. Please choose from MULTIPLE_CHOICE, SHORT_ANSWER, or TRUE_FALSE."

    return f"""
# Hello!

I am your AI-mentor here to help you test your understanding.

## Objective

{task.text}

## Topics

This quiz covers the following topics:

{topics_list}

## Quiz Question

{quiz_question["prompt_content"]}

Follow the instructions to answer the question correctly.
"""

# Example usage
task_example = Task("Learn the basics of Python programming.")
topics_example = [Topic("Variables"), Topic("Loops"), Topic("Functions")]

print(get_quiz_prompt(task_example, topics_example, "MULTIPLE_CHOICE"))
