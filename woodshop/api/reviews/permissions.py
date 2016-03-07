from rest_framework import permissions
from .models import Review
from woodshop.api.transactions.models import Transaction

class CanCreateReview(permissions.BasePermission):
	# I gave up on DRY permissions for this -- 
	# I could never get it to call "has_create_permission" when creating an object, which is strange.
	# and, I can't foresee any downside to doing this permission this way

	def has_permission(self, request, view):
		if request.method in permissions.SAFE_METHODS:
			return True

		elif request.method == "POST":
			#creating review
			gem = request.data.get('gem', None)
			user = request.user.id
			if not gem:
				# bad POST request
				return False
			
			# check if a review already has been written
			r = Review.objects.select_related('gem').select_related('author').filter(gem=gem, author=user).first()
			if r:
				# prexisting review
				return False
			t = Transaction.objects.filter(gem__pk=gem, buyer=user).first()
			if not t:
				# user did not buy gem
				return False
			return True

class CanUpdateReview(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        if request.method is 'PATCH':
            return obj.author.id == request.user.id
        else:
        	return False