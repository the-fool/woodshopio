from django.test import TestCase
from nose.tools import eq_, raises

from ..models import Gem, Picture
from .factories import GemFactory, PictureFactory

class TestGemModel(TestCase):
    
    def setUp(self):
        self.gem = Gem()
        
    @raises(ValueError)
    def test_gem_rejects_bogus_author(self):
        self.gem.author = "BOGUS"
        self.gem.save()

class TestPictureModel(TestCase):
    def test_picture_path_is_related_to_gem(self):
    	# TODO
    	PictureFactory.create()