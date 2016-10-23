from rest_framework import serializers
from users.models import User


class UserSerializer(serializers.ModelSerializer):
    """ Serializer to represent the user model """
    class Meta:
        model = User
        fields = ("id","tokn","name","password","address","email","phone")
