from rest_framework import serializers

from .models import Review
from woodshop.api.users.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Review
