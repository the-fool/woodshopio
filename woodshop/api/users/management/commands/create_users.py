from django.core.management.base import BaseCommand
from woodshop.api.users.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        users = ['Bob', 'Sally', 'Joe', 'Rachel']
        for user in users:
            username = user.lower()
            User.objects.create(username=username, email="{}@example.com".format(username), first_name=user, password='password')
