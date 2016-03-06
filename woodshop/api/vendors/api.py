from django.shortcuts import render

from rest_framework import generics, permissions

from woodshop.api.transactions.models import Transaction
from woodshop.api.transactions.serializers import TransactionVendorSerializer

# Create your views here.
class VendorTransactionList(generics.ListAPIView):
  model = Transaction
  serializer_class = TransactionVendorSerializer
  permission_classes = [
    permissions.AllowAny
  ]

  def get_queryset(self):
    queryset = Transaction.objects.all()
    return queryset.filter(gem__vendor__pk=self.rquest.user.id)