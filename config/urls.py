from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.core.urlresolvers import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter

from woodshop.users.api import UserViewSet
from woodshop.gems.api import GemViewSet
from woodshop.frontend import urls as frontend_urls

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'gems', GemViewSet)

urlpatterns = [
    url(r'', include(frontend_urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('woodshop.authentication.urls')),
    url(r'^api/', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
