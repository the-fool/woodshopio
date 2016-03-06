import uuid
from django.db import models

from woodshop.api.users.models import User

class Vendor(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	name = models.CharField(max_length=128, unique=True)
	owner = models.OneToOneField(User, related_name="vendor")