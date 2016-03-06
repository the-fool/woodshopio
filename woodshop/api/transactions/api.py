from rest_framework import generics
from rest_framework import permissions
from dry_rest_permissions.generics import DRYPermissions

from .models import Transaction
from .serializers import TransactionPersonalSerializer

class TransactionList(generics.ListAPIView):
  model = Transaction
  serializer_class = TransactionPersonalSerializer
  permission_classes = [
    DRYPermissions
  ]

  def get_queryset(self):
      queryset = Transaction.objects.select_related('buyer').select_related('gem').all()
      if self.request.user.is_superuser:
       return queryset
      return queryset.filter(buyer__id=self.request.user.id)

class TransactionDetail(generics.RetrieveUpdateDestroyAPIView):
  model = Transaction
  serializer_class = TransactionPersonalSerializer
  queryset = Transaction.objects.select_related('buyer').select_related('gem').all()
  permission_classes = [
    DRYPermissions
  ]