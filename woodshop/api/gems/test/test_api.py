from rest_framework.test import APITestCase, APIClient
from django.forms.models import model_to_dict
from django.core.urlresolvers import reverse
from nose.tools import ok_, eq_

from ..models import Gem
from .factories import GemFactory


class TestGemAPI(APITestCase):
    
    def setUp(self):
        self.url = reverse('gem-list')
        Gem.objects.all().delete()
        self.gem_data = model_to_dict(GemFactory.create())
        self.client = APIClient()
        
    def test_get_request_succeeds(self):
        response = self.client.get(self.url)
        pk = response.data.get('results')[0].get('id')
        eq_(response.status_code, 200)
        gem = Gem.objects.get(pk=pk)
        eq_(gem.title, self.gem_data.get('title'))
        