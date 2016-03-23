from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.core.urlresolvers import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic.base import RedirectView
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from woodshop.api import urls as api_urls

urlpatterns = [
    url(r'^$', TemplateView.as_view(template_name='index.html'), name="home"),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(api_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
