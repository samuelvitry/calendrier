from rest_framework import serializers
from .models import User, Evenement

class eventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evenement
        fields = (
            'event_name',
            'start_date',
            'end_date',
            'creation_date',
        )

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'username',
            'account_creation_date',
        )

class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'password',
        )