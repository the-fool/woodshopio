from rest_framework import serializers

from .models import Gem, Picture
from woodshop.api.users.serializers import UserSerializer

class GemSerializer(serializers.ModelSerializer):
    author = UserSerializer(required=False)
    pictures = serializers.HyperlinkedIdentityField(view_name='gempicture-list')
    
    def get_validation_exclusions(self, *args, **kwargs):
    	# I don't know what this is for -- it's copied from a tutorial
        # Need to exclude `user` since we'll add that later based off the request
        exclusions = super(GemSerializer, self).get_validation_exclusions(*args, **kwargs)
        return exclusions + ['author']

    class Meta:
        model = Gem


class PictureSerializer(serializers.ModelSerializer):
    image = serializers.URLField(source='image.url')

    class Meta:
        model = Picture