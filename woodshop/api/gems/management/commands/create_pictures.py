
import os
import os.path

from django.core.management.base import BaseCommand

from django.core.files import File
from django.conf import settings

from woodshop.api.gems.models import Picture, Gem



class Command(BaseCommand):
	pixture_dir = 'pixtures'

	def handle(self, *args, **options):

		sample_images = [File(open(os.path.join(self.pixture_dir, fn), 'rb')) for fn in os.listdir(os.path.join(settings.PROJECT_ROOT, self.pixture_dir))]
		Picture.objects.all().delete()
		gems = Gem.objects.all()

		for x in range(1,4):
			for i, gem in enumerate(gems):
				Picture.objects.create(gem=gem, image=sample_images[(i + x) % len(sample_images)])

		for g in Gem.objects.all():
			g.main_picture = g.pictures.all()[0]
			g.save()
