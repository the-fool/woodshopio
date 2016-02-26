from rest_framework import serializers
from .models import User
from ..gems.models import Gem
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email')
        read_only_fields = ('username', )

#setting up vendor user
class VendorSerializer(serializers.ModelSerializer):
    #a vendor can be associated with multiple gems
    gems = serializers.PrimaryKeyRelatedField(many=True, queryset=Gem.objects.all())



class CreateUserSerializer(serializers.ModelSerializer):
    
    def create(self, validated_data):
        # call create_user on user object. Without this
        # the password will be stored in plain text.
        user = User.objects.create_user(**validated_data)
        return user

    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'auth_token')
        read_only_fields = ('auth_token',)
        write_only_fields = ('password',)