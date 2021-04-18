from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import logout, login, authenticate
from django.shortcuts import redirect
from calendrier.models import Evenement

def index(request):
    if request.user.is_authenticated:
        #event_list = liste des evenement de l'utilisateur, a trier pour afficher...
        event_list = []
        for i in Evenement.objects.filter(proprio=request.user):
            event_list.append(i.event_name)
        return HttpResponse(str(event_list))
    else:
        return redirect('/calendrier/login')

def logout_view(request):
    logout(request)
    return HttpResponse("Vous êtes déconnecté !")

def login_view(request):
    logout(request)
    username = password =''
    if request.POST:
        username = request.POST['username']
        password = request.POST['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/calendrier/')
    return render(request, 'login.html')