
import os
import os.path

from django.core.management.base import BaseCommand

from django.core.files import File
from django.conf import settings

from woodshop.gems.models import Picture, Gem



class Command(BaseCommand):
    pixture_dir = 'pixtures'

    def handle(self, *args, **options):

        sample_images = [File(open(os.path.join(self.pixture_dir, fn), 'rb')) for fn in os.listdir(os.path.join(settings.PROJECT_ROOT, self.pixture_dir))]
        Picture.objects.all().delete()
        gems = Gem.objects.all()

        for x in range(1,4):
	        for i, image in enumerate(sample_images):
	            Picture.objects.create(gem=gems[(i + x) % gems.count()], image=image)