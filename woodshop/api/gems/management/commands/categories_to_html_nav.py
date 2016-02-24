import os
from django.core.management.base import BaseCommand
from django.conf import settings
from woodshop.api.gems.models import Category

class Command(BaseCommand):
    def handle(self, *args, **options):

        categories = Category.objects.all()
        l = []
        level = ['second','third','fourth','fifth','sixth']
        index = 0
        def traverse(node):
        	nonlocal index
        	for i in node:
        		if i[1]: # if not leaf
        			l.append(
        			   	'<li><a><span ng-click="cats.setCategory()" class="cat-text">{}</span><span class="fa arrow"></span></a>'.format(i[0]) +	
        			   	'<ul class="nav nav-{}-level collapse" aria-expanded="false" style="height: 0px;">'.format(level[index])
        			   	)
        			index += 1
        			traverse(i[1])
        		else:   # if leaf
        			l.append(
        				'<li><a href="#">{}</a></li>'.format(i[0]))
        	l.append('</ul></li>')
        	index -= 1
        
        traverse(Category.CATS)
        with open(os.path.join(os.path.abspath(settings.PROJECT_ROOT), 'woodshop/frontend/bazaar/templates/cat_sidebar.html'), 'w') as out:
        	out.write(''.join(l))

