from django.db import models
from ..gems.models import Gem
from django.conf import settings


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
	rating = models.PositiveSmallIntegerField(blank = True)
	review = models.TextField(blank = True)
	reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name = "review")
	gem = models.ForeignKey(Gem, blank=True, related_name = "review")
	title = models.CharField(max_length=128, unique=True)

	#TODO write the following methods

	# returns the average rating of a gem
	def gem_average():
		pass

	#custom create review method
	def create_review():
		pass








