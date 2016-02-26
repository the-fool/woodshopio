import itertools

from django.core.management.base import BaseCommand

from woodshop.api.users.models import User
from woodshop.api.gems.models import Gem, Category

descriptions = ['This is text', 
               'Another thing I wanted to share',
               'Guns guns guns',
               'Particle effects',
               '5 dimensional terrain generator',
               'Shrubs',
               'Zombie vampire megamix',
               'Fast cars',
               'Photorealistic anime',
               'Literary giants',
               'Oddly shaped coins',
               'Deep space RTS simulator 15',
               'The entire cast of Fraiser', 
               'This is more text', 
               'Another other thing I wanted to share',
               'Guns guns guns babes and lemonade',
               'Particle affects',
               '5 dimensional terrain destroyer',
               'Paths',
               'Zombie vampire megamix 2',
               'Fast cars, faster cars',
               'Photorealistic anime zines',
               'Literary giants of America',
               'Oddly shaped coins and things',
               'Deep space RTS simulator 15555',
               'The entire cast of Fraiser again']


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = User.objects.filter(is_vendor__exact=True)
        Gem.objects.all().delete()
        for i, d in enumerate(descriptions):
            g = Gem.objects.create(author=users[i % users.count()], 
                               title="Title #{}".format(i + 1), 
                               description=d)

