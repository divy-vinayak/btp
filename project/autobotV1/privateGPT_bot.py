import requests

url = 'http://0.0.0.0:8001'
completion_endpoint = '/v1/completion'
chat_completion_endpoint = '/v1/chat/completions'

def get_doc_id():
    res = requests.get(url + "/v1/ingest/list")
    if res.status_code == 200:
        res = res.json()
        return res['data'][0]['doc_id']
    else:
        return None

try:
    doc_id = get_doc_id()
except:
    doc_id = None
def get_result(messages: list[dict]):
    if not doc_id:
        return "BOT IS INACTIVE AT THE MOMENT"
    print(f"DOC_ID: {doc_id}")
    data = {
        "context_filter": {
        "docs_ids": [doc_id] if doc_id else []
        },
        "include_sources": True,
        "messages": [
        {
        "content": messages[0]["content"],
        "role": "user"
        }
        ],
        "stream": False,
        "use_context": True
    }
    result = requests.post(url=url+chat_completion_endpoint, json=data)
    if result.status_code == 200:
        result = result.json()
        return result["choices"][0]["message"]['content']
    print("printing problem")
    print(result.json())
    return "OOPS LOOKS LIKE THERE'S A PROBLEM"