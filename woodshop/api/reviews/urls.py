from django.conf.urls import url, include

from .api import Review, ReviewDetail

review_urls = [
	url(r'^(?P<pk>.+)$', ReviewDetail.as_view(), name='transaction-detail'),
	url(r'^$', Review.as_view(), name='review-create')
]

urlpatterns = [
	url(r'', include(review_urls)),
]
