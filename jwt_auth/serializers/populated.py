from .common import UserSerializer
from animals.serializers.common import AnimalSerializer
from rest_framework import serializers
from ..models import User

class PopulatedUserSerializer(serializers.ModelSerializer):
    animals = AnimalSerializer()
    class Meta:
        model = User
        fields = '__all__'