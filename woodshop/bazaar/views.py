from django.shortcuts import render
from django.template.context_processors import request

def home_page(request):
    return render(request, 'home.html')