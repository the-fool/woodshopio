from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.template.context_processors import request

def dashboard(request):
	print(request.COOKIES)
	if not request.user.is_authenticated() or not request.user.is_vendor:
		print(request.user)
		return redirect('/', request=request)
	print("SUCCESS")
	return render(request, 'cubicle/dashboard.html')