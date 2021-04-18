from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Evenement, User
from .serializers import eventSerializer, userSerializer

class eventList(APIView):
    pass

class logIn(APIView):
    pass
        
