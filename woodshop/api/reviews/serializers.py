from rest_framework import serializers
from dry_rest_permissions.generics import DRYPermissionsField
from .models import Review
from woodshop.api.users.serializers import MinimalUserSerializer

class ReviewSerializer(serializers.ModelSerializer):
	permissions = DRYPermissionsField(actions=["update", "create"])
	author = MinimalUserSerializer()

	class Meta:
		model = Review
		fields = ('author', 'title', 'permissions', 'text', 'gem', 'rating', 'id')


	