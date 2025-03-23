from openai import OpenAI
import time

client = OpenAI(
  base_url="https://openrouter.ai/api/v1",
  api_key="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",
)

now = time.time()

completion = client.chat.completions.create(
  extra_body={},
  model="deepseek/deepseek-chat:free",
  messages=[
    {
      "role": "user",
      "content": "Give me a short poem with 4 lines"
    }
  ]
)

print("Completed in", time.time() - now, "seconds")



print(completion.choices[0].message.content)

