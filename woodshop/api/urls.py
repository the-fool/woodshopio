from django.conf.urls import url, include


from .users import urls as user_urls
from .authentication import urls as auth_urls
from .gems import urls as gem_urls

urlpatterns = [
	url(r'', include(auth_urls)),
	url(r'^users/?', include(user_urls)),
	url(r'^gems/', include(gem_urls))
]
