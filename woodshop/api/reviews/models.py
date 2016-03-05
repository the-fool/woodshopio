import uuid

from django.db import models
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.core.validators import MaxValueValidator, MinValueValidator

from ..transactions.models import Transaction
from ..gems.models import Gem

class TimeStampedModel(models.Model):
	"""
	Abstract base class model which provides
	self updating 'created' and 'modified' fields.
	"""
	created = models.DateTimeField(auto_now_add=True)
	modified = models.DateTimeField(auto_now_add=True)

	class Meta:
		abstract = True


class Review(TimeStampedModel):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	rating = models.PositiveSmallIntegerField(validators = [MaxValueValidator(5), MinValueValidator(1)])
	text = models.TextField(blank = True, null=True)
	author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="reviews")
	gem = models.ForeignKey(Gem, related_name="reviews")
	title = models.CharField(max_length=128)

	def __repr__(self):
		return "<Review: {0} -- {1}/5>".format(self.title, self.rating)
	
	# override
	def save(self, *args, **kwargs):
		""" 
		On saving a review, update the average rating for the gem 
		This task should be passed to a Celery worker
		"""
		s = 0 
		i = 0
		for r in self.gem.reviews.all():
			s += r.rating
			i += 1
		self.gem.rating = (s + self.rating)/(i + 1)
		self.gem.save()
		super(Review, self).save(*args, **kwargs)

	
	@staticmethod
	def has_create_permission(request):
		gem = request.POST.get('gem', None)
		if gem:
			try:
				t = Transaction.objects.get(gem=gem, buyer=request.user.id)
				return True
			except Transaction.DoesNotExist:
				return False
			except ValueError: # malformed arguments
				return False
		else:
			return False

	@staticmethod
	def has_write_permission(request):
	    return True

	def has_object_write_permission(self, request):
	    return False

	def has_object_update_permission(self, request):
	    return request.user == self.author
