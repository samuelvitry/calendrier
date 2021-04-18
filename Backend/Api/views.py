from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Evenement, User
from .serializers import eventSerializer, userSerializer

class eventList(APIView):
    def get(self, request):
        if request.session['is_log_in'] == True:
            event = Evenement.objects.filter(proprio=request.session['proprio'])
            serializer = eventSerializer(event, many= True)
            return Response(serializer.data)
        else:
            pass
    
    def post(self):
        pass

class logIn(APIView):
    def get(self, request):
            user = User.objects.all()
            serializer = userSerializer(user, many= True)
            return Response(serializer.data)
    def post(self, request):
        serializer = userSerializer(data=request.data)
        if User.objects.filter(email=serializer.data.email):
            if User.objects.filter(password=serializer.data.password):
                request.session['is_log_in'] = True
                request.session['proprio'] = serializer.email  #il faudra avoir autre chose que l'email
