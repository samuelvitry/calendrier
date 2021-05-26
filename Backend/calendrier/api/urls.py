from django.urls import path
from .views import ListEvent, LoginView, CreateEvent, CreateUser, DeleteEvent

urlpatterns = [
    path('', ListEvent.as_view()),
    path('login', LoginView.as_view()),
    path('create', CreateEvent.as_view()),
    path('userCreate', CreateUser.as_view()),
    path('eventDelete', DeleteEvent.as_view()),
]