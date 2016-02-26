
from django.db import models

from ..gems.models import Gem
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

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
	rating = models.PositiveSmallIntegerField(validators = [MaxValueValidator(5), MinValueValidator(1)])
	review = models.TextField(blank = True, null=True)
	reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="reviews")
	gem = models.ForeignKey(Gem, related_name="reviews")
	title = models.CharField(max_length=128, unique=True)

	#TODO write the following methods

	# returns the average rating of a gem
	def gem_average():
		pass

	#custom create review method
	def create_review():
		pass








