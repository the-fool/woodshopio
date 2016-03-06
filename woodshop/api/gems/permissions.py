from rest_framework import permissions
from .models import Gem, Picture
from woodshop.api.transactions.models import Transaction

class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        gemID = view.kwargs.get('pk')
        if list(Gem.objects.filter(vendor__pk=request.user.id, id=gemID).all()):
            # not using 'get()' in order to avoid relying on exception catching 
            return True
        else:
            return False

class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        if type(obj) is Gem:
            return obj.vendor.id == request.user.id
        elif type(obj) is Picture:
            return obj.gem.vendor == request.user

class CanAddPicture(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        elif request.method == "POST":
            #creating picture
            pk=request.data.get('gem', None)
            if not pk:
                return False
            g = Gem.objects.get(pk=pk)
            if g:
                return g.vendor == request.user
            else:
                return False