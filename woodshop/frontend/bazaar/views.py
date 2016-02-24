from django.shortcuts import render
from django.template.context_processors import request

from woodshop.api.gems.models import Category

def home_page(request):
    return render(request, 'bazaar_home.html')