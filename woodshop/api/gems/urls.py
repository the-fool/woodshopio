from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter

from .api import GemPictureList, GemDetail, GemList
#from .api import PictureDetail


"""picture_urls = [
	url(r'^(?P<pk>.+)$', PictureDetail.as_view(), name='picture-detail')
]"""

gem_urls = [
	url(r'^(?P<pk>[0-9a-zA-Z_-]+)/pictures/?$',  GemPictureList.as_view(), name='gempicture-list'),
	url(r'^(?P<pk>[0-9a-zA-Z_-]+)/?$', GemDetail.as_view(), name='gem-detail'),
	url(r'^category/(?P<category>.+)/?$', GemList.as_view(), name='gem-list-by-category'),
	url(r'^$', GemList.as_view(), name='gem-list')
]

urlpatterns = [
	url(r'', include(gem_urls)),
]
