import uuid

from django.db import models
from django.conf import settings

class Gem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=('gems'))
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True, null=True)
    
    
    