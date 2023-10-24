from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("res", views.bot_response, name="bot_response")
]
