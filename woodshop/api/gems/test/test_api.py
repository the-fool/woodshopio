from rest_framework.test import APITestCase, APIClient
from django.forms.models import model_to_dict
from django.core.urlresolvers import reverse
from nose.tools import ok_, eq_

from ..models import Gem
from .factories import GemFactory


class TestGemAPI(APITestCase):
    
    def setUp(self):
        Gem.objects.all().delete()
        self.gem_data = model_to_dict(GemFactory.create())
        self.client = APIClient()
        
    def test_get_request_succeeds_with_pk_param(self):
        url = reverse('gem-list')
        response = self.client.get(url)
        pk = response.data.get('results')[0].get('id')
        eq_(response.status_code, 200)
        gem = Gem.objects.get(pk=pk)
        eq_(gem.title, self.gem_data.get('title'))

    def test_get_request_returns_list_without_pk(self):
        url = reverse('gem-list')
        response = self.client.get(url)
        eq_(response.data.get('count'), 1)
        GemFactory.create()
        response = self.client.get(url)
        eq_(response.data.get('count'), 2)

    def test_get_gem_detail_succeeds(self):
        gem = GemFactory.create()
        url = reverse('gem-detail', kwargs={'pk': gem.id})
        response = self.client.get(url)
        eq_(response.status_code, 200)
        eq_(response.data.get('id'), str(gem.id))

    def test_get_gem_detail_fails(self):
        url = reverse('gem-detail', kwargs={'pk': 'FOO'})
        response = self.client.get(url)
        eq_(response.status_code, 404)
