from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from . import openai_bot

# Create your views here.
def index(request):
    return render(request, "autobot/index.html")

@csrf_exempt
def bot_response(request):
    if request.method == "POST":
        try:
            input_text = json.loads(request.body)
        except json.JSONDecodeError:
            response_data = {'error': 'Invalid JSON data'}
            return JsonResponse(response_data, status=400)
        
        # call bot, create output
        messages = [{"role": "user", "content": input_text['msg']}]
        result = {'msg': openai_bot.get_result(messages)['choices'][0]["message"]["content"]}
        # print(result)
        response_data = {'result': result}
        return JsonResponse(response_data)
    
    response_data = {'error': 'Invalid request method'}
    return JsonResponse(response_data, status=405)
