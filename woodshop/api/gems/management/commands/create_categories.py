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
            Category(id=full_name, name=Command.simple_name(full_name), is_leaf=category['is_leaf']).save()

        """Cache a JSON repr"""
        contents = []
        with open(os.path.join(os.path.abspath(settings.PROJECT_ROOT), 'woodshop/frontend/static/app/index.constants.js'), 'r') as f:
            contents = f.readlines()

        i = None
        for index, line in enumerate(contents):
            if 'injectCategories' in line:
                    i = index + 1
        if i:
            contents[i] = json.dumps(Category.CATS) + '\n'
            with open(os.path.join(os.path.abspath(settings.PROJECT_ROOT), 'woodshop/frontend/static/app/index.constants.js'), 'w') as f:
                contents = "".join(contents)
                f.write(contents)



    @staticmethod
    def simple_name(full_name):
        return full_name.split('_')[-1]
