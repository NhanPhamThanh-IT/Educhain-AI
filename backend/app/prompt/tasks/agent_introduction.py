from typing import List

class Task:
    def __init__(self, text: str):
        self.text = text

class Topic:
    def __init__(self, name: str):
        self.name = name

def agent_introduction(task: Task, topics: List[Topic]) -> str:
    topics_list = "\n".join(f"{index + 1}) {topic.name}" for index, topic in enumerate(topics))
    
    return f"""
# Hello!

I am your AI-mentor here to walk you through your learning objective.

## Objective

{task.text}

## Topics

I've broken down your objective into the following topics:

{topics_list}

I will ask you a series of questions to help you understand the topics better. At any point, feel free to ask me questions or for clarification.
"""

# Example usage
task_example = Task("Learn the basics of Python programming.")
topics_example = [Topic("Variables"), Topic("Loops"), Topic("Functions")]

print(agent_introduction(task_example, topics_example))
