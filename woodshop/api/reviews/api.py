from rest_framework import generics
from rest_framework import permissions

from dry_rest_permissions.generics import DRYPermissions

from .models import Review
from .serializers import ReviewSerializer


class Review(generics.CreateAPIView):
  model = Review
  serializer_class = ReviewSerializer
  permission_classes = (DRYPermissions,)

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Review
    serializer_class = ReviewSerializer
    permission_classes = [
        permissions.AllowAny
    ]