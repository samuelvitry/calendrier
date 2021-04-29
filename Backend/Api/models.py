from django.db import models
import string
import random

def getCode():
    length = 32

    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if User.objects.filter(code=code).count() == 0:
            break
    
    return code

class User(models.Model):
    email = models.EmailField(max_length=512, unique=True)
    password = models.CharField(max_length=1024)
    username = models.CharField(max_length=512, unique=True)
    account_creation_date = models.DateTimeField(auto_now_add=True)
    cle = models.CharField(max_length=1024)
    code = models.CharField(max_length=32, default=getCode)
    def __str__(self):
        return self.username
#le chiffrement des clé peut inclure la primary key de l'user ainsi que la date de création + un code a X chiffre défini ou non par l'utilisateur (il faut avoir un champ qui dit si il y en as un)

class Evenement(models.Model):
    event_name = models.CharField(max_length=512)
    start_date = models.DateTimeField('Start date')
    end_date = models.DateTimeField('End date')
    proprio = models.CharField(max_length=512)
    def __str__(self):
        return self.event_name
    creation_date = models.DateTimeField(auto_now_add=True)
    
