from django.contrib.auth.models import User
from .serializers import UserSerializer, CreateUserSerializer
from rest_framework import generics,viewsets, mixins
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework.permissions import AllowAny

User = get_user_model()

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def create(self, request, *args, **kwargs):
        self.serializer_class = CreateUserSerializer
        self.permission_classes = (AllowAny,)
        return super(UserList, self).create(request, *args, **kwargs)

class UserDetail(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)  
  
