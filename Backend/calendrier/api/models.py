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

def getEventCode():
    length = 256

    while True:
        key = ''.join(random.choices(string.ascii_letters, k=length))
        if Evenement.objects.filter(key=key).count() == 0:
            break
    
    return key


class User(models.Model):
    email = models.EmailField(max_length=512, unique=True)
    password = models.CharField(max_length=1024)
    username = models.CharField(max_length=512, unique=True)
    account_creation_date = models.DateTimeField(auto_now_add=True)
    code = models.CharField(max_length=32, default=getCode)    #code = proprio
    key = models.CharField(max_length=512)
    def __str__(self):
        return self.username

class Evenement(models.Model):
    event_name = models.CharField(max_length=512)
    start_date = models.IntegerField()
    end_date = models.IntegerField()
    full = models.BooleanField(default=True)
    proprio = models.CharField(max_length=512)
    creation_date = models.DateTimeField(auto_now_add=True)
    color = models.IntegerField(default=5)
    calendar = models.CharField(max_length=1024)
    key = models.CharField(max_length=1024, default=getEventCode)
    recurence = models.IntegerField(default=-1)
    def __str__(self):
        return self.event_name