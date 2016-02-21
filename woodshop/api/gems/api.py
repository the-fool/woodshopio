from rest_framework import viewsets, mixins, generics
from rest_framework import permissions

from .models import Gem, Picture
from .serializers import GemSerializer, PictureSerializer



class GemList(generics.ListCreateAPIView):
  model = Gem
  queryset = Gem.objects.all()
  serializer_class = GemSerializer
  permission_classes = [
    permissions.AllowAny
  ]

class GemDetail(generics.RetrieveUpdateDestroyAPIView):
  model = Gem
  serializer_class = GemSerializer
  queryset = Gem.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]

class GemPictureList(generics.ListAPIView):
  model = Picture
  serializer_class = PictureSerializer
  queryset = Picture.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]

  def get_queryset(self):
    queryset = super(GemPictureList, self).get_queryset()
    return queryset.filter(gem__pk=self.kwargs.get('pk'))


class PictureDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Picture
    serializer_class = PictureSerializer
    permission_classes = [
        permissions.AllowAny
    ]