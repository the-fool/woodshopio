from rest_framework import generics
from .models import Gem

class GemList(generics.ListAPIView):
    