from openai import OpenAI
import os
api_key=os.environ.get("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)

def make_api_call():
    try:
        chat_completion = client.chat.completions.create(
            messages=[
                {
                    "role": "user",
                    "content": "Write a simple Hello",
                }
            ],
            model="gpt-3.5-turbo",
        )
        message = chat_completion.choices[0].message.content
        print(message)
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    make_api_call()