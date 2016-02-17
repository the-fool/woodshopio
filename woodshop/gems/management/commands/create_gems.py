from django.core.management.base import BaseCommand

from users.models import User
from gems.models import Gem

descriptions = ['This is text', 
               'Another thing I wanted to share',
               'Guns guns guns',
               'Particle effects',
               '5 dimensional terrain generator',
               'Shrubs']


class Command(BaseCommand):
    def handle(self, *args, **options):
        users = User.objects.all()

        for i, d in enumerate(descriptions):
            Gem.objects.create(author=users[i % users.count()], 
                               title="Title #{}".format(i + 1), description=d)