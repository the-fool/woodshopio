from django.conf.urls import url, include
from . import api

urlpatterns = [ 
url(r'^$', api.UserList.as_view()),
url(r'^(?P<pk>[0-9]+)/$', api.UserDetail.as_view()),
]
