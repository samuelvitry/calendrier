from django.urls import path
from .views import eventList, logIn

urlpatterns = [
    path('eventList', eventList.as_view()),
    path('login', logIn.as_view()),
]