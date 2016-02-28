from django.conf.urls import url
from .bazaar import views as bazaar_views
from .cubicle import views as cubicle_views

urlpatterns = [
    url(r'^$', bazaar_views.home_page, name="bazaar"),
    url(r'^vendor/$', cubicle_views.dashboard, name="dashboard") 
]