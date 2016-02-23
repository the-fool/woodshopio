import os

from django.core.files import File
from django.conf import settings

import uuid
import factory

from woodshop.api.users.test.factories import UserFactory

class GemFactory(factory.django.DjangoModelFactory):
    
    class Meta:
        model = 'gems.Gem'
        
        
    id = factory.Sequence(lambda n: uuid.uuid4())
    title = factory.Sequence(lambda n: 'title{}'.format(n))
    description = factory.Sequence(lambda n: 'description {}'.format(n))
    author = UserFactory.create()


pixture_dir = 'pixtures'
sample_images = [File(open(os.path.join(pixture_dir, fn), 'rb')) for fn in os.listdir(os.path.join(settings.PROJECT_ROOT, pixture_dir))]

class PictureFactory(factory.django.DjangoModelFactory):

	class Meta:
		model = 'gems.Picture'
		django_get_or_create = ('id',)
	id = factory.Sequence(lambda n: uuid.uuid4())
	gem = GemFactory.create()
	image = sample_images[0]