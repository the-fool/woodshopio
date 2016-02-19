from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .api import GemViewSet, GemPictureList
from .api import PictureDetail

router = DefaultRouter()
router.register(r'gems', GemViewSet)

picture_urls = [
	url(r'^(?P<pk>.+)$', PictureDetail.as_view(), name='picture-detail')
]

gem_urls = [
	url(r'^(?P<pk>.+)/pictures$',  GemPictureList.as_view(), name='gempicture-list')
]

urlpatterns = [
	url(r'^gems', include(gem_urls)),
	url(r'^pictures', include(picture_urls)),
	url(r'', include(router.urls))
]
