def plain_text_command(prompt_content: str) -> dict:
    return {
        "response_tag": "PLAIN_TEXT",
        "response_description": "The user has sent you this message.",
        "response_formatting": "string: <content>",
        "prompt_tag": "PLAIN_TEXT",
        "prompt_content": prompt_content,
        "prompt_type": "PLAIN_TEXT"
    }

# Example usage:
print(plain_text_command("Hello, how are you?"))