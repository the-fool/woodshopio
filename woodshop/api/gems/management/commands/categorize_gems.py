from django.core.management.base import BaseCommand

from woodshop.api.gems.models import Gem, Category


class Command(BaseCommand):
    def handle(self, *args, **options):
        categories = list(Category.objects.filter(is_leaf__exact=True))
        gems = Gem.objects.all()
        for i, g in enumerate(gems):
            g.add_category(categories[i % len(categories)])

