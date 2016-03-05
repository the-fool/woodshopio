from rest_framework import generics
from rest_framework import permissions
from dry_rest_permissions.generics import DRYPermissions

from .models import Transaction
from .serializers import TransactionSerializer

class TransactionList(generics.ListAPIView):
  model = Transaction
  queryset = Transaction.objects.select_related('buyer').select_related('gem').all()
  serializer_class = TransactionSerializer
  permission_classes = [
    DRYPermissions
  ]


class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
  model = Transaction
  serializer_class = TransactionSerializer
  queryset = Transaction.objects.select_related('buyer').select_related('gem').all()
  permission_classes = [
    permissions.AllowAny
  ]