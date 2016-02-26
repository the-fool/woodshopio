from django.shortcuts import render
from django.template.context_processors import request

def dashboard(request):
	if not request.user.is_vendor:
		return render(request, '/')
	return render(request, 'cubicle/dashboard.html')