from django.core.management.base import BaseCommand

from woodshop.api.gems.models import Category

class Command(BaseCommand):
    
    def handle(self, *args, **options):
        Category.objects.all().delete()
        for category in Category.get_category_names():
            full_name = category['name']
            Category(full_name=full_name, name=Command.simple_name(full_name), is_leaf=category['leaf']).save()

    @staticmethod
    def simple_name(full_name):
        return full_name.split('_')[-1]