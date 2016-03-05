from django.conf.urls import url, include

from .api import TransactionList, TransactionDetail

transaction_urls = [
	url(r'^(?P<pk>.+)$', TransactionDetail.as_view(), name='transaction-detail'),
	url(r'^$', TransactionList.as_view(), name='transaction-list')
]

urlpatterns = [
	url(r'', include(transaction_urls)),
]
