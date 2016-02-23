from django.core.management.base import BaseCommand

from woodshop.api.users.models import User
from woodshop.api.gems.models import Gem

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
               'The entire cast of Fraiser']


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = User.objects.all()
        Gem.objects.all().delete()
        for i, d in enumerate(descriptions):
            Gem.objects.create(author=users[i % users.count()], 
                               title="Title #{}".format(i + 1), description=d)
