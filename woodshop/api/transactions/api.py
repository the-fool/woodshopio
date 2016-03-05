from rest_framework import generics
from rest_framework import permissions

from .models import Transaction
from .serializers import TransactionSerializer

class TransactionList(generics.ListCreateAPIView):
  model = Transaction
  queryset = Transaction.objects.all()
  serializer_class = TransactionSerializer
  permission_classes = [
    permissions.AllowAny
  ]

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
  model = Transaction
  serializer_class = TransactionSerializer
  queryset = Transaction.objects.all()
  permission_classes = [
    permissions.AllawAny
  ]