import os
import json

from django.core.management.base import BaseCommand
from django.conf import settings

from woodshop.api.gems.models import Category

class Command(BaseCommand):
    
    def handle(self, *args, **options):
        Category.objects.all().delete()
        for category in Category.get_category_names():
            full_name = category['name']
            Category(id=full_name, name=Command.simple_name(full_name), is_leaf=category['leaf']).save()

        """Cache a JSON repr"""
        with open(os.path.join(os.path.abspath(settings.PROJECT_ROOT), 'woodshop/frontend/static/categories.json'), 'w') as f:
            json.dump(Category.CATS, f)

    @staticmethod
    def simple_name(full_name):
        return full_name.split('_')[-1]