from django.conf.urls import url
from .bazaar import views as bazaar_views

urlpatterns = [
    url(r'^$', bazaar_views.home_page, name="bazaar") 
]