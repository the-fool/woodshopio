from rest_framework import serializers

from .models import Transaction
from woodshop.api.users.serializers import UserSerializer

class TransactionSerializer(serializers.ModelSerializer):
    buyer = UserSerializer(required=False)
    
    class Meta:
        model = Transaction
        fields = ('id', 'gem', 'buyer', 'created', 'modified')