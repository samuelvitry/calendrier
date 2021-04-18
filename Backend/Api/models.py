from django.db import models

class User(models.Model):
    email = models.EmailField(max_length=512, unique=True)
    password = models.CharField(max_length=1024)
    username = models.CharField(max_length=512, unique=True)
    account_creation_date = models.DateTimeField(auto_now_add=True)
    cle = models.CharField(max_length=1024)
    def __str__(self):
        return self.username
    def isValid(mail, mdp):
        if User.objects.filter(email=mail, password=mdp).exists():
            return True
        else:
            return False
            

class Evenement(models.Model):
    event_name = models.CharField(max_length=512)
    start_date = models.DateTimeField('Start date')
    end_date = models.DateTimeField('End date')
    proprio = models.CharField(max_length=512)
    def __str__(self):
        return self.event_name
    creation_date = models.DateTimeField(auto_now_add=True)
