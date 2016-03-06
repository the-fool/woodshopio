from rest_framework import serializers

from .models import Transaction
from woodshop.api.users.serializers import UserSerializer
from woodshop.api.gems.serializers import GemSerializer

""" There are two basic use cases for transaction queries
	1: A vendor wants them for a particular gem
	2: A user wants a purchase history
	Each has a different set of relevant data
"""

class TransactionPersonalSerializer(serializers.ModelSerializer):
    gem = GemSerializer

    class Meta:
        model = Transaction
        fields = ('id', 'gem', 'created', 'modified')

class TransactionVendorSerializer(serializers.ModelSerializer):
	buyer = UserSerializer(required=False)

	class Meta:
		model = Transaction
		fields = ('id', 'gem', 'buyer', 'created', 'modified')