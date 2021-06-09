from django.urls import path
from .views import ListEvent, LoginView, CreateEvent, CreateUser, DeleteEvent, Logout, UpdateEvents

urlpatterns = [
    path('', ListEvent.as_view()),
    path('login', LoginView.as_view()),
    path('create', CreateEvent.as_view()),
    path('userCreate', CreateUser.as_view()),
    path('eventDelete', DeleteEvent.as_view()),
    path('logout', Logout.as_view()),
    path('update', UpdateEvents.as_view()),
]