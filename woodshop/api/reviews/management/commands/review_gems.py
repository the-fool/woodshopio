from django.core.management.base import BaseCommand

from woodshop.api.reviews.models import Review
from woodshop.api.gems.models import Gem
from woodshop.api.users.models import User
import random

reviews = ["Suspendisse potenti. Nam quis tristique nulla, ut laoreet libero. Vestibulum fermentum faucibus mattis. \
Fusce volutpat, odio a congue euismod, turpis risus dictum risus, mollis dictum massa sem eu sem.\
Cras ante sem, consequat vel dui ut, iaculis suscipit mi. Suspendisse at mauris a ante consectetur condimentum. \
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus fermentum \
lacus arcu, nec varius lectus sodales ut. Integer est ligula, finibus ac dui sed, iaculis malesuada justo.\n" + 
"Curabitur non risus imperdiet purus tristique mattis. Nam bibendum pharetra ligula, id accumsan nulla\
placerat eu. Fusce id neque tempor, gravida odio at, venenatis sapien.", 
"Very short review -- will buy again",
"Mestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus fermentum \
lacus arcu, nec varius lectus sodales ut. Integer est ligula, finibus ac dui sed, iaculis malesuada justo.\n" + 
"Curabitur non risus imperdiet purus tristique mattis. Nam bibendum pharetra ligula, id accumsan nulla\
placerat eu. Fusce id neque tempor, gravida odio at, venenatis sapien."]

class Command(BaseCommand):
    def handle(self, *args, **options):
        gems = Gem.objects.all()
        users = User.objects.all()
        for i, g in enumerate(gems):
        	for j, r in enumerate(reviews):
        		Review.objects.create(gem=g, text=r, author=users[(i + j) % users.count()], rating=random.randint(1,5), title="Review {0}{1}".format(i,j))

