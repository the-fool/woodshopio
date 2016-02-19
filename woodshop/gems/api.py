from rest_framework import viewsets, mixins, generics
from rest_framework.permissions import AllowAny

from .models import Gem, Picture
from .serializers import GemSerializer, PictureSerializer

class GemViewSet(mixins.RetrieveModelMixin,
              mixins.UpdateModelMixin,
              mixins.ListModelMixin,
              viewsets.GenericViewSet):
    """
    Updates, lists and retrieves Gem objects
    """
    queryset = Gem.objects.all()
    serializer_class = GemSerializer
    permission_classes = (AllowAny,)


class PictureDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Picture
    serializer_class = PictureSerializer
    permission_classes = [
        AllowAny
    ]

class GemPictureList(generics.ListAPIView):
	model = Picture
	serializer_class = PictureSerializer

	def get_queryset(self):
		queryset = super(GemPictureList, self).get_queryset()
		return queryset.filter(gem__pk=self.kwargs.get('pk'))
