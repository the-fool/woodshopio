from rest_framework.authentication import TokenAuthentication
from rest_auth.views import LogoutView

class LogoutViewCustom(LogoutView):
    authentication_classes = (TokenAuthentication,)
