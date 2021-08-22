from django.db import models
from rest_framework import serializers
from .models import User, Evenement

class eventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evenement
        fields = (
            'event_name',
            'start_date',
            'end_date',
            'color',
            'full',
            'calendar',
            'key',
            'recurence',
            'recurenceEndType',
            'recurenceEndNbr'
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
            'calendar',
            'recurence',
            'recurenceEndType',
            'recurenceEndNbr',
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
            'key'
        )

class CodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'key',
        )

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'account_creation_date',
            'username'
        )