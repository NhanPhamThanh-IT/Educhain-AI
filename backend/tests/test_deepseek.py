import os
from openai import OpenAI
from termcolor import colored
import time
import re

# User Configuration
USER_PROMPT = "create a beautiful tower defense game in pygame. do not use outsiede assets. all assets should be created within pygame"
NUMBER_OF_ITERATIONS = 20

# Constants
MODEL = "deepseek/deepseek-chat:free"
OUTPUT_FOLDER = "generated_code"
SYSTEM_PROMPT = """You are an expert Python programmer specializing in creating visually stunning and well-structured applications. Generate clean, efficient, and well-documented Python code based on the user's request.

Follow these EXACT rules for code generation:
1. ALWAYS wrap your code response in <code></code> tags
2. Include ALL necessary imports at the top
3. Include proper error handling with try/except blocks
4. Add descriptive comments and docstrings
5. Return ONLY the code within the tags, no explanations outside the tags
6. Make sure the code is complete and can run immediately
7. Use proper Python formatting and PEP 8 guidelines
8. NEVER use or reference external files (no loading images, sounds, or data files)
9. ALL assets (graphics, sounds, data) must be generated programmatically within the code
10. DO NOT include file operations (open, save, load) for external resources

For visual applications (GUI, games, graphics):
- Create beautiful, polished visuals using ONLY programmatic generation
- All graphics must be drawn using the framework's primitives (shapes, lines, etc.)
- Implement smooth animations and transitions
- Use appealing color schemes and visual effects
- Design intuitive and responsive UI/UX
- Add visual feedback for user interactions
- Include particle effects and visual polish where appropriate
- ALL visual assets must be created within the code itself

Example response format:
<code>
import something

def main():
    # Your code here
    pass

if __name__ == "__main__":
    main()
</code>"""

# Initialize OpenAI client
try:
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key = "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"
    )
except Exception as e:
    print(colored(f"Error initializing OpenAI client: {str(e)}", "red"))
    exit(1)

def extract_code(response_text):
    """Extract code from between <code></code> tags."""
    try:
        pattern = r"<code>(.*?)</code>"
        match = re.search(pattern, response_text, re.DOTALL)
        return match.group(1).strip() if match else None
    except Exception as e:
        print(colored(f"Error extracting code: {str(e)}", "red"))
        return None

def generate_code(prompt, iteration=1):
    """Generate code using DeepSeek model."""
    try:
        print(colored(f"\nGenerating code - Iteration {iteration}...", "cyan"))
        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"Create a new Python program for: {prompt}"}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(colored(f"Error generating code: {str(e)}", "red"))
        return None

def improve_code(code, iteration):
    """Improve existing code."""
    try:
        print(colored(f"\nImproving code - Iteration {iteration}...", "yellow"))
        improvement_prompt = """Improve this Python code with the following priorities:

1. Error Detection and Prevention:
   - Identify and fix any potential runtime errors
   - Check for edge cases and handle them
   - Validate all user inputs and parameters
   - Add defensive programming practices
   - Ensure proper resource cleanup
   - Verify all calculations and operations
   - Check for potential memory leaks
   - Validate game states and transitions
   - Handle window/screen edge cases
   - Prevent potential race conditions

2. If there are visual elements (GUI, game graphics, etc.):
   - Enhance visual aesthetics (colors, shapes, animations)
   - Add visual polish (particles, effects, transitions)
   - Improve UI/UX elements
   - Make the visuals more professional and engaging
   - ALL graphics must be generated programmatically (NO external files)
   - Use framework primitives to create all visual assets
   - Ensure smooth frame rates and performance
   - Handle window resizing gracefully
   - Add visual feedback for errors/exceptions

3. Add new features that make sense for this type of application:
   - Expand core functionality
   - Add quality-of-life improvements
   - Implement additional user interactions
   - Include more game mechanics/options if it's a game
   - ALL assets must be created within the code
   - Add proper state management
   - Implement undo/redo if applicable
   - Add pause/resume functionality if needed

4. Technical improvements:
   - Optimize performance
   - Enhance error handling with descriptive messages
   - Improve code organization
   - Add helpful comments and error documentation
   - NO external file operations or dependencies
   - Add logging for critical operations
   - Implement proper cleanup in finally blocks
   - Add type hints and validation
   - Use context managers where appropriate

5. Common Error Prevention:
   - Division by zero checks
   - None/null checks
   - Index out of bounds prevention
   - Type checking and conversion
   - Resource initialization verification
   - Event handler error catching
   - Timer/animation frame checks
   - Collision detection edge cases
   - Screen boundary checks
   - Memory management

Keep the code complete and runnable. Return the improved code in <code></code> tags.
IMPORTANT: Do not use or reference any external files (images, sounds, data files, etc.).
Make sure to handle ALL possible error cases with descriptive error messages."""

        completion = client.chat.completions.create(
            model=MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": f"{improvement_prompt}\n\nHere's the code to improve:\n{code}"}
            ]
        )
        return completion.choices[0].message.content
    except Exception as e:
        print(colored(f"Error improving code: {str(e)}", "red"))
        return None

def save_code(code, iteration):
    """Save generated code to file."""
    try:
        if not os.path.exists(OUTPUT_FOLDER):
            os.makedirs(OUTPUT_FOLDER)
        
        filename = os.path.join(OUTPUT_FOLDER, f"generated_code_v{iteration}.py")
        with open(filename, "w", encoding="utf-8") as f:
            f.write(code)
        print(colored(f"Code saved to: {filename}", "green"))
    except Exception as e:
        print(colored(f"Error saving code: {str(e)}", "red"))

def main():
    print(colored(f"Starting code generation for prompt: {USER_PROMPT}", "cyan"))
    print(colored(f"Number of iterations: {NUMBER_OF_ITERATIONS}", "cyan"))

    code = None
    # Generate and improve code for all iterations
    for i in range(NUMBER_OF_ITERATIONS):
        if i == 0:
            # Initial generation
            response = generate_code(USER_PROMPT, i + 1)
        else:
            # Subsequent improvements
            response = improve_code(code, i + 1)
        
        if not response:
            continue

        code = extract_code(response)
        if not code:
            print(colored("No code found in the response", "red"))
            continue

        # Save code for this iteration
        save_code(code, i)
        time.sleep(1)  # Rate limiting

    print(colored("\nCode generation and improvement completed!", "green"))

if __name__ == "__main__":
    main()