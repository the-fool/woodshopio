from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from .api import UserViewSet

router = DefaultRouter()
router.register(r'', UserViewSet)

urlpatterns = [ url(r'^users', include(router.urls))]