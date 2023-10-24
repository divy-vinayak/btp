import openai
from langchain.adapters import openai as lc_openai

# messages = [{"role": "user", "content": "hi"}]
def get_result(messages: list[dict]):
    result = openai.ChatCompletion.create(
        messages=messages, 
        model="gpt-3.5-turbo", 
        temperature=0
    )

    return result

if __name__ == "__main__":
    print(get_result([{"role": "user", "content": "what is the capital of India?"}]))