from django.conf.urls import url, include


from .users import urls as user_urls
from .authentication import urls as auth_urls
from .transactions import urls as transaction_urls
from .vendors import urls as vendor_urls
from .gems.urls import gem_urls, picture_urls


urlpatterns = [
	url(r'^users/', include(user_urls)),
	url(r'^gems/', include(gem_urls)),
	url(r'^pictures/', include(picture_urls)),
	url(r'^transactions/', include(transaction_urls)),
	url(r'^vendors/', include(vendor_urls)),
]
