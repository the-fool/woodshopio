import uuid
from django.db import models
from django.conf import settings
from django.utils.encoding import python_2_unicode_compatible

from dry_rest_permissions.generics import DRYPermissions, allow_staff_or_superuser, authenticated_users

from ..gems.models import Gem

"""
TimeStampedModel will need to be moved a level up since it 
will act as the the base class for many models
"""

class TimeStampedModel(models.Model):
	"""
	Abstract base class model which provides
	self updating 'created' and 'modified' fields.
	"""
	created = models.DateTimeField(auto_now_add=True)
	modified = models.DateTimeField(auto_now_add=True)

	class Meta:
		abstract = True

@python_2_unicode_compatible
class Transaction(TimeStampedModel):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	gem = models.ForeignKey(Gem, related_name="transactions")
	buyer = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="transactions")
	
	def __repr__(self):
		return '<Transaction: {0}>'.format(self.t_id)

	@staticmethod
	@authenticated_users
	def has_read_permission(request):
		return True

	
	
	




