import uuid

from django.db import models
from django.conf import settings


class Category(models.Model):
	# PS -- the reason for doing categories this way is for the sake of JSONifying the cat heirarchy 
	# Then client-side display can represent the structure
	
	CATS = [
	('3D Models', [
		('Characters', [
			('Human', [
				('Fantasy', ''),
				('Sci-fi', ''),
				('Miltary', ''),
				('Other', '')
				]
				),
			('Animal', [
				('Land',''),
				('Sea',''),
				('Other', '')
				]
				),
			('Robot', ''),
			('Other', '')
			]
			),
		('Vehicles', [
			('Air',''),
			('Land',''),
			('Space', ''),
			('Other', '')
			]
			)
		]
		),
	('Shaders', [
		('Landscape',''),
		('Camera FX',''),
		('Other', '')
		]
		)
	]

	
	@staticmethod
	def get_category_names():
		""" 
		Returns ordered list of every node on category tree.
		Each item separated by '_', e.g. UrParent_sub1_subOfSub1
		"""
		l = []

		def cont(name, node):
			for i in node:
				name = name + '_' + i[0]
				l.append(name)
				if i[1]:
					cont(name, i[1])
				name = '_'.join(name.split('_')[:-1])

		for i in Category.CATS:
			name = i[0]
			l.append(name)
			cont(name, i[1])

		return l


	name=models.CharField(max_length=128, blank=True)

class Gem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=("gems"))
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True, null=True)
    main_picture = models.OneToOneField('Picture', related_name='gem_asset', blank=True, null=True)
    categories = models.ManyToManyField(Category,blank=True, related_name ="gems")

def image_dir_path(instance, filename):
	ext = filename.split('.')[-1]
	path = 'gem_{0}/{1}.{2}'.format(instance.gem.id, instance.id, ext)
	return path

class Picture(models.Model):
	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	gem = models.ForeignKey('Gem', related_name='pictures')
	image = models.ImageField(upload_to=image_dir_path, max_length=255)

	

""" These methods are not for production! """
from django.db.models.signals import post_delete
from django.dispatch.dispatcher import receiver
import os, shutil
@receiver(post_delete, sender=Picture)
def picture_delete(sender, instance, **kwargs):
	"""Delete picture file"""
	# Pass false so FileField doesn't save the model.
	instance.image.delete(False)

@receiver(post_delete, sender=Gem)
def gem_dir_delete(sender, instance, **kwargs):
	"""Remove the gem's photo directory"""
	if os.environ['DJANGO_CONFIGURATION'] == 'Local':
		shutil.rmtree(os.path.join(settings.MEDIA_ROOT, 'gem_{}'.format(instance.id)), 
			ignore_errors=True)

