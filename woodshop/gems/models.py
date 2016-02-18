import uuid

from django.db import models
from django.conf import settings

class Gem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=('gems'))
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True, null=True)

def image_dir_path(instance, filename):
	ext = filename.split('.')[-1]
	path = 'gem_{0}/{1}.{2}'.format(instance.gem.id, instance.id, ext)
	print(path)
	return path

class Picture(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	gem = models.ForeignKey(Gem, related_name='pictures')
	image = models.ImageField(upload_to=image_dir_path, max_length=255)

	