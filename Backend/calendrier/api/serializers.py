from rest_framework import serializers
from .models import User, Evenement

class eventSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'events',
        )

class createEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evenement
        fields = (
            'event_name',
            'start_date',
            'end_date',
            'color',
            'full',
            'calendar'
        )

class loginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'password',
        )

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'username',
            'cle',
            'cle2',
            'key'
        )

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'key',
        )

#create user serializer
#