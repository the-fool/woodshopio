from rest_framework import generics
from rest_framework import permissions

from .models import Review
from .serializers import ReviewSerializer


class Review(generics.CreateAPIView):
  model = Review
  serializer_class = ReviewSerializer
  queryset = Gem.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Review
    serializer_class = ReviewSerializer
    permission_classes = [
        permissions.AllowAny
    ]