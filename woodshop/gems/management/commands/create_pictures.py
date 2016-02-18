
import os
import os.path

from django.core.management.base import BaseCommand
from django.conf import settings

from woodshop.gems.models import Picture, Gem


class Command(BaseCommand):
    pixture_dir = 'pixtures'

    def handle(self, *args, **options):
        sample_images = [os.path.join(self.pixture_dir, fn) for fn in os.listdir(os.path.join(settings.PROJECT_ROOT, self.pixture_dir))]

        gems = Gem.objects.all()

        for _ in range(1,3):
	        for i, image in enumerate(sample_images):
	            Picture.objects.create(gem=gems[i % gems.count()], image=image)