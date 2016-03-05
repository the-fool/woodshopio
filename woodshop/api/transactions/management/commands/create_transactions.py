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
    	gems = Gem.objects.all()
    	for i, u in enumerate(users):
    		for j in range(0,5):
    			g = gems[(j+i) % gems.count()]
    			t= Transaction(gem=g, buyer=u)
    			t.save()