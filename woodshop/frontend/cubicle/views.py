from django.shortcuts import render, redirect
from django.core.urlresolvers import reverse
from django.template.context_processors import request

def dashboard(request):
	if not request.user.is_authenticated() or not request.user.is_vendor:
		return redirect('/', request=request)
	return render(request, 'cubicle/cubicle.html')