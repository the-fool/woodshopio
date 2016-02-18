from django.test import TestCase
from django.forms.models import model_to_dict
from nose.tools import eq_, ok_
from .factories import GemFactory
from ..serializers import GemSerializer

class TestGemSerializer(TestCase):
    
    def setUp(self):
        self.gem_data = model_to_dict(GemFactory.create())
    
    def test_serializer_returns_author(self):
        pass