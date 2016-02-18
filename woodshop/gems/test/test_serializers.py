from django.test import TestCase
from django.test.client import RequestFactory
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_

from .factories import GemFactory
from ..serializers import GemSerializer
from woodshop.users.test.factories import UserFactory

class TestGemSerializer(TestCase):
    
    def setUp(self):
        self.gem = GemFactory.build()
        self.gem_data = model_to_dict(self.gem)
        
    def test_serializer_returns_author(self):
        author = UserFactory.build()
        self.gem.author = author
        context = dict(request=RequestFactory().get('/'))
        serializer = GemSerializer(self.gem, context=context)
        eq_(self.gem.author.username, 
            serializer.data['author']['username'])
        
      