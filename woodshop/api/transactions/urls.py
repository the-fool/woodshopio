from django.conf.urls import url, include

from .api import TransactionPersonalList, TransactionDetail

transaction_urls = [
	url(r'^(?P<pk>.+)$', TransactionDetail.as_view(), name='transaction-detail'),
	url(r'^$', TransactionPersonalList.as_view(), name='transaction-list')
]

urlpatterns = [
	url(r'', include(transaction_urls)),
]
