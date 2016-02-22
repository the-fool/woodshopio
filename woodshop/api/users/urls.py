from django.conf.urls import url, include
from . import api

urlpatterns = [ 
url(r'^$', api.UserList.as_view(), name='user-list'),
url(r'^(?P<pk>.+)$', api.UserDetail.as_view(), name='user-detail'),
]
