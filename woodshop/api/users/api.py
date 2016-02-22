from django.contrib.auth.models import User
from .serializers import UserSerializer, CreateUserSerializer
from rest_framework import generics
from .permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

User = get_user_model()

class UserList(generics.ListAPIView,
               mixins.CreateModelMixin,
               mixins.UpdateModelMixin,):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    # from tutorial. create override method
    def create(self, request, *args, **kwargs):
        self.serializer_class = CreateUserSerializer
        self.permission_classes = (AllowAny,)
        return super(UserList, self).create(request, *args, **kwargs)

class UserDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwnerOrReadOnly,)