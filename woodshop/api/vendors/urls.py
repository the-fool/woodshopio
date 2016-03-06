from django.conf.urls import url, include

from .api import VendorTransactionList

vendor_urls = [
	url(r'^(?P<pk>.+)/transactions/?$', VendorTransactionList.as_view(), name='vendortransaction-list')
]

urlpatterns = [
	url(r'', include(vendor_urls)),
]
