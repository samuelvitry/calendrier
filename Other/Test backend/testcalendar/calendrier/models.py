from django.db import models

class Evenement(models.Model):
    event_name = models.CharField(max_length=512)
    start_date = models.DateTimeField('Start date')
    end_date = models.DateTimeField('End date')
    proprio = models.CharField(max_length=512)
    def __str__(self):
        return self.event_name