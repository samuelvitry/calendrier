from django.db import models

class Utilisateur(models.Model):
    public_name = models.CharField(max_length=128)
    mail_adresse = models.EmailField(max_length=512)
    mdp = models.CharField(max_length=512)
    key1 = models.CharField(max_length=512)

class Evenement(models.Model):
    event_name = models.CharField(max_length=512)
    start_date = models.DateTimeField('Start date')
    end_date = models.DateTimeField('End date')
    proprio = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
