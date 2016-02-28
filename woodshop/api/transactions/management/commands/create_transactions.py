from django.core.management.base import BaseCommand
from woodshop.api.users.models import User
from woodshop.api.transactions.models import Transaction
from woodshop.api.gems.models import Gem

"""
Creates 5 dummy transactions for every user 
"""

class Command(BaseCommand):
    def handle(self, *args, **options):
    	Transaction.objects.all().delete()
    	users = User.objects.all()
    	gems = Gem.objects.all()[:5]
    	for i, u in enumerate(users):
    		print(i)
    		for j, g in enumerate(gems):
    			t= Transaction(gem=g, buyer=u)
    			t.save()