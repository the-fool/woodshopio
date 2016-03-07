from rest_framework import permissions
from .models import Review
from woodshop.api.transactions.models import Transaction

class CanCreateReview(permissions.BasePermission):

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