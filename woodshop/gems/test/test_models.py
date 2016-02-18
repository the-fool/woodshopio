from django.test import TestCase
from nose.tools import eq_, raises

from ..models import Gem

class TestGemModel(TestCase):
    
    def setUp(self):
        self.gem = Gem()
        
    @raises(ValueError)
    def test_gem_rejects_bogus_author(self):
        self.gem.author = "BOGUS"
        self.gem.save()