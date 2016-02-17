from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny

from .models import Gem
from .serializers import GemSerializer

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