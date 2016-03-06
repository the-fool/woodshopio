from rest_framework import generics
from rest_framework import permissions

from dry_rest_permissions.generics import DRYPermissions

from .models import Review
from .serializers import ReviewSerializer


class Review(generics.CreateAPIView):
  model = Review
  serializer_class = ReviewSerializer
  permission_classes = (DRYPermissions,)

  # override
  def create(self, request, *args, **kwargs):
  	# force the user id (since one could spoof the POST body)
  	request.data.__setitem__('author', request.user.id)
  	print(request.data)
  	return super(Review, self).create(request, *args, **kwargs)

class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Review
    serializer_class = ReviewSerializer
    permission_classes = [
        permissions.AllowAny
    ]