from django.conf.urls import url, include

from .api import GemPictureList, GemReviewList, GemDetail, GemList
from .api import PictureDetail, PictureList


picture_urls = [
	url(r'^(?P<pk>.+)$', PictureDetail.as_view(), name='picture-detail'),
	url(r'^$', PictureList.as_view(), name='picture-list')
]

gem_urls = [
	url(r'^(?P<pk>[0-9a-zA-Z_-]+)/pictures/?$',  GemPictureList.as_view(), name='gempicture-list'),
	url(r'^(?P<pk>.+)/reviews/?$', GemReviewList.as_view(), name='gemreview-list'), 
	url(r'^(?P<pk>[0-9a-zA-Z_-]+)/?$', GemDetail.as_view(), name='gem-detail'),
	url(r'^$', GemList.as_view(), name='gem-list')
]

urlpatterns = [
	url(r'', include(gem_urls)),
]
