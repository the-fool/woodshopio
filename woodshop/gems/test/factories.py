import uuid
import factory

from woodshop.users.test.factories import UserFactory

class GemFactory(factory.django.DjangoModelFactory):
    
    class Meta:
        model = 'gems.Gem'
        django_get_or_create = ('id',)
        
    id = factory.Sequence(lambda n: uuid.uuid4())
    title = factory.Sequence(lambda n: 'title{}'.format(n))
    description = factory.Sequence(lambda n: 'description {}'.format(n))
    author = UserFactory.build()
    