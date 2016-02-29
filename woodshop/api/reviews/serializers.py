from rest_framework import serializers
from dry_rest_permissions.generics import DRYPermissionsField
from .models import Review
from woodshop.api.users.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
	permissions = DRYPermissionsField()

	class Meta:
		model = Review
		fields = ('author', 'title', 'permissions')

	
   
