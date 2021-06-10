from hashlib import sha256
import hashlib
from django.shortcuts import render
from rest_framework import generics, status
from .serializers import eventSerializer, loginSerializer, CreateUserSerializer, CodeSerializer, createEventSerializer
from .models import User, Evenement
from rest_framework.views import APIView
from rest_framework.response import Response

class ListEvent(APIView):
    def get(self, request):
        if 'isLog' in request.session:
            if request.session['isLog'] == True:
                events = Evenement.objects.filter(proprio=request.session['proprio'])
                utilisateur = User.objects.filter(code=request.session['proprio'])
                serializer = eventSerializer(events, many=True)
                serializer2 = CodeSerializer(utilisateur, many=True)
                return Response({"event": serializer.data, "code": serializer2.data}, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    

class LoginView(APIView):

    lookup_url_kwarg = 'mdp'

    def get(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.GET.get(self.lookup_url_kwarg)
        if code != None:
            user = User.objects.filter(password=code)
            if len(user) > 0:
                request.session['proprio'] = user[0].code
                request.session['isLog'] = True
                return Response(status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class CreateEvent(APIView):

    serializer_class = createEventSerializer

    def post(self, request, format=None):

        if not self.request.session.exists(self.request.session.session_key):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        elif not self.request.session['isLog'] == True:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        else:
            serializer = self.serializer_class(data=request.data)
            if serializer.is_valid():
                event_name = serializer.data.get('event_name')
                start_date = serializer.data.get('start_date')
                end_date = serializer.data.get('end_date')
                color = serializer.data.get('color')
                full = serializer.data.get('full')
                calendar = serializer.data.get('calendar')
                proprio = self.request.session['proprio']
                q = Evenement(event_name=event_name, start_date=start_date, end_date=end_date, color=color, full=full, proprio=proprio, calendar=calendar)
                q.save()
                return Response(status=status.HTTP_201_CREATED)

class CreateUser(APIView):

    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
                email = serializer.data.get('email')
                password = serializer.data.get('password')
                username = serializer.data.get('username')
                cle = serializer.data.get('cle')
                cle2 = serializer.data.get('cle2')
                q = User(email=email, password=password, username=username, cle=cle, cle2=cle2)
                q.save()
                return Response(status=status.HTTP_201_CREATED)

class DeleteEvent(APIView):

    lookup_url_kwarg = 'key'

    def get(self, request, format=None):
        if 'isLog' in request.session:
            if request.session['isLog'] == True:
                code = request.GET.get(self.lookup_url_kwarg)
                q = Evenement.objects.filter(proprio=request.session['proprio'], key=code)
                q.delete()
                events = Evenement.objects.filter(proprio=request.session['proprio'])
                utilisateur = User.objects.filter(code=request.session['proprio'])
                serializer = eventSerializer(events, many=True)
                serializer2 = CodeSerializer(utilisateur, many=True)
                return Response({"event": serializer.data, "code": serializer2.data}, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

class Logout(APIView):

    def get(self, request, format=None):
        if 'isLog' in request.session:
            request.session['isLog'] = False
        return Response(status=status.HTTP_200_OK)