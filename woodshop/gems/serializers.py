from rest_framework import serializers

from .models import Gem
from woodshop.users.serializers import UserSerializer

class GemSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False)
    
    def get_validation_exclusions(self, *args, **kwargs):
        # Need to exclude `user` since we'll add that later based off the request
        exclusions = super(GemSerializer, self).get_validation_exclusions(*args, **kwargs)
        return exclusions + ['author']
    
    class Meta:
        model = Gem