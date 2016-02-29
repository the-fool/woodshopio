from rest_framework import permissions
from .models import Gem, Picture


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions are only allowed to the owner of the snippet.
        if type(obj) is Gem:
            return obj.vendor == request.user
        elif type(obj) is Picture:
            print('in here ********')
            return obj.gem.vendor == request.user

        print('heeellllleoooo')