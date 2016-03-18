import uuid

from django.db import models
from django.conf import settings


class Category(models.Model):
	""" For now, a simple two-level system of categories
		Hopefully keywords and search functionality can be a sufficient substitute for a crazy category schema
	"""

	CATS = [
		('3D Models', [
			'Characters',
			'Vehicles',
			'Weapons',
			'Environment',
			'Other'
			]
		),
		('Shaders', [
			'Landscape',
			'Camera FX',
			'Other'
			]
		),
		('Full projects', [
			'2D',
			'3D',
			'Other'
			]
		),
		('2D Assets', [
			'Sprites',
			'Terrain',
			'UI',
			'Other'
			]
		),
		('Other', [])
	]


	@staticmethod
	def get_category_names():
		"""
		Returns ordered list of every node on category tree.
		Each item separated by '_', e.g. UrParent_sub1_subOfSub1
		"""
		l = []

		for top_level in Category.CATS:
			""" top_level[0] is a string
				top_level[1] is a list of children
			"""
			name = top_level[0]
			if name == 'Other':
				l.append({'name':top_level[0], 'is_leaf':True})
			else:
				l.append({'name':top_level[0], 'is_leaf':False})

			for sub in top_level[1]:
				name = top_level[0] + "_" + sub
				l.append({'name':name, 'is_leaf':True})

		return l

	@staticmethod
	def generate_parent_names(full_name):
		sub_names = full_name.split('_')
		for i in range(1, len(sub_names) + 1):
			parent = '_'.join(sub_names[:i])
			c = Category.objects.get(id=parent)
			yield c

	id=models.CharField(max_length=128, default='', primary_key=True) 	  # (Ur_sub1_sub2_leaf)
	name=models.CharField(max_length=128, default='') 		  			  # simple name ('sub2')
	is_leaf=models.BooleanField(default=False)

	def __repr__(self):
		return '<Category: {}>'.format('_'.join(self.full_name.split('_')[-2:]))

	def __str__(self):
		return self.name



def get_random_pic():
	return Gem.objects.pictures

class Gem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    vendor = models.ForeignKey(settings.AUTH_USER_MODEL, related_name=("gems"))
    title = models.CharField(max_length=128, unique=True)
    description = models.TextField(blank=True, null=True)
    # main_picture will be reassigned on_delete through a signal
    main_picture = models.OneToOneField('Picture', related_name='gem_asset', blank=True, null=True, on_delete=models.DO_NOTHING)
    categories = models.ManyToManyField(Category, blank=True, related_name ="gems")

    # 'Rating' is not updated through api, but on save for releated reviews
    rating = models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True)

    """ Must use this method for adding categories, not the field.add() method """
    def add_category(self, category):
    	for c in Category.generate_parent_names(category.id):
    		self.categories.add(c)
    	self.save()

    def __repr__(self):
    	return '<Gem: {}>'.format(self.title)

def image_dir_path(instance, filename):
	ext = filename.split('.')[-1]
	path = 'gem_{0}/{1}.{2}'.format(instance.gem.id, instance.id, ext)
	return path

class Picture(models.Model):

	id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
	gem = models.ForeignKey('Gem', related_name='pictures')
	image = models.ImageField(upload_to=image_dir_path, max_length=255)


from django.db.models.signals import post_delete, pre_delete
from django.dispatch.dispatcher import receiver
import os, shutil
@receiver(pre_delete, sender=Picture)
def picture_pre_delete(sender, instance, **kwargs):
	""" Reassign main picture to gem if necessary """
	# Pass false so FileField doesn't save the model.
	if hasattr(instance, 'gem_asset'):
		gem = instance.gem_asset
	else: gem = None

	if gem: # we have deleted main picture
		pics = gem.pictures.all()
		if pics[1]:
			gem.main_picture = pics[1]
			gem.save()

""" These methods are not for production! """
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
