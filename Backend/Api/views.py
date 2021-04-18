from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from .models import Evenement, User
from .serializers import eventSerializer, userSerializer

class eventList(generics.ListAPIView):
    queryset = Evenement.objects.all()
    serializer_class = eventSerializer

#class logIn(APIView):
#appeler isValid du model user avec les argument mail et mdp reçu et si true alors session.islog = true et determiner les valeurs de sessions
#quand l'utilisateur est co envoyer a l'user la clé, elle sera stocké sous forme de cookie/autre moyen de stockage
#en gros la page de login post les info de login puis si c'est faut elle reçoie un msg d'erreur ou si c'est juste elle receive la clé, then elle place ces info dans un variable, then elle appelle une fonction qui gère la suite (affichage de l'erreur ou redirection et stockage de la clé)
#la clée est stocké coté db et transféré sous form chiffré a l'aide d'un code (numérique ou alpha numérique) inchangable qui est demandé a l'utilisateur au moment de se co, on vérif aussi si le code est vrai car sa version hash est stocké sur la database. la clée est stocké sur le client en version non crypté

#quand on crée proprio, avoir un code qui vérif si il est unique
