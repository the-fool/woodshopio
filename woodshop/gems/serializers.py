from rest_framework import serializers

from .models import Gem
from woodshop.users.serializers import UserSerializer

class GemSerializer(serializers.ModelSerializer):
    author = UserSerializer
    
    class Meta:
        model = Gem