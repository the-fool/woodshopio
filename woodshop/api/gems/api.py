from django.http.response import HttpResponseBadRequest, HttpResponse

from rest_framework import generics
from rest_framework import permissions

from .models import Gem, Picture
from .serializers import GemSerializer, PictureSerializer
from .permissions import IsOwner, IsOwnerOrReadOnly, CanAddPicture

from woodshop.api.reviews.models import Review
from woodshop.api.reviews.serializers import ReviewSerializer
from woodshop.api.transactions.models import Transaction
from woodshop.api.transactions.serializers import TransactionVendorSerializer


class GemList(generics.ListCreateAPIView):
  model = Gem
  serializer_class = GemSerializer
  permission_classes = [
    IsOwnerOrReadOnly
  ]
  def get_queryset(self):
    queryset = Gem.objects.select_related('vendor')\
                          .select_related('main_picture')\
                          .all()\
                          .prefetch_related('categories')
    
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
  queryset = Review.objects.select_related('author').all()
  permission_classes = [
    permissions.AllowAny
  ]

  def get_queryset(self):
    queryset = super(GemReviewList, self).get_queryset()
    return queryset.filter(gem__pk=self.kwargs.get('pk'))

class GemTransactionList(generics.ListAPIView):
  model = Transaction
  serializer_class = TransactionVendorSerializer
  permission_classes = [
    IsOwner
  ]
  def get_queryset(self):
    queryset = Transaction.objects.select_related('buyer')\
                          .filter(gem__vendor__pk=self.request.user.id)\
                          .filter(gem__pk=self.kwargs.get('pk'))\
                          .all()
    return queryset


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
    CanAddPicture
  ]

  def post(self, request, *args, **kwargs):
    image = request.FILES['image']
    gem = Gem.objects.get(pk=request.data.get('gem', None))
    if not gem or not image:
      return HttpResponseBadRequest()
    Picture.objects.create(gem=gem, image=request.FILES['image'])
    return HttpResponse()


  def get_queryset(self):
    queryset = Picture.objects.all()
    gem = self.request.query_params.get('gem', None)
    if gem is not None:
      queryset = queryset.filter(gem=gem)

    return queryset