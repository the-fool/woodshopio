from django.core.management.base import BaseCommand
from woodshop.api.users.models import User

class Command(BaseCommand):
    def handle(self, *args, **options):
        User.objects.all().delete()
        users = ['Bob', 'Sally', 'Joe', 'Rachel']
        for user in users:
            username = user.lower()
            u = User(username=username, email="{}@example.com".format(username), first_name=user)
            u.set_password('password')
            u.save()
        vendors = ['vendor{}'.format(i) for i in range(1,5)]
        for v in vendors:
        	u = User(username=v, email="{}@example.com".format(username), first_name=v)
        	u.set_password('password')
        	u.is_vendor = True
        	u.save()
