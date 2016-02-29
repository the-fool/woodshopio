from django.http.response import HttpResponseBadRequest, HttpResponse

from rest_framework import generics
from rest_framework import permissions

from .models import Gem, Picture
from .serializers import GemSerializer, PictureSerializer
from .permissions import IsOwnerOrReadOnly, CanAddPicture
from woodshop.api.reviews.models import Review
from woodshop.api.reviews.serializers import ReviewSerializer


class GemList(generics.ListCreateAPIView):
  model = Gem
  queryset = Gem.objects.all()
  serializer_class = GemSerializer
  permission_classes = [
    IsOwnerOrReadOnly
  ]
  def get_queryset(self):
    queryset = Gem.objects.all()
    category = self.request.query_params.get('category', None)
    if category is not None:
      queryset = queryset.filter(categories=category)

    vendor = self.request.query_params.get('vendor', None)
    if vendor is not None:  
      queryset = queryset.filter(vendor=vendor)

    return queryset

class GemDetail(generics.RetrieveUpdateDestroyAPIView):
  model = Gem
  serializer_class = GemSerializer
  queryset = Gem.objects.all()
  permission_classes = [
    IsOwnerOrReadOnly
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

class GemReviewList(generics.ListAPIView):
  model = Review
  serializer_class = ReviewSerializer
  queryset = Review.objects.all()
  permission_classes = [
    permissions.AllowAny
  ]

  def get_queryset(self):
    queryset = super(GemReviewList, self).get_queryset()
    return queryset.filter(gem__pk=self.kwargs.get('pk'))

class PictureDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Picture
    serializer_class = PictureSerializer
    queryset = Picture.objects.all()
    permission_classes = [
        IsOwnerOrReadOnly
    ]


class PictureList(generics.ListCreateAPIView):
  model = Picture
  queryset = Picture.objects.all()
  serializer_class = PictureSerializer
  permission_classes = [
    IsOwnerOrReadOnly, CanAddPicture
  ]

  def post(self, request, *args, **kwargs):
    gem_id = request.data.get('gem', None)
    if gem_id is None:
      return HttpResponseBadRequest(content="Error -- no asset id provided")
    return HttpResponse()


  def get_queryset(self):
    queryset = Picture.objects.all()
    gem = self.request.query_params.get('gem', None)
    if gem is not None:
      queryset = queryset.filter(gem=gem)

    return queryset