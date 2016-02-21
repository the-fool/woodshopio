from django.shortcuts import render
from django.template.context_processors import request

def dashboard(request):
    return render(request, 'cubicle/dashboard.html')