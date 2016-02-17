from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.core.urlresolvers import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter

from users.api import UserViewSet
from gems.api import GemViewSet
from bazaar import views as bazaar_views

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'gems', GemViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('authentication.urls')),
    url(r'^api/', include(router.urls)),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    url(r'^$', bazaar_views.home_page, name='home'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
