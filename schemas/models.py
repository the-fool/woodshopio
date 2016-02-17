from django.db import models

class Products(models.Model):
    product_name = models.CharField(max_length=200)
    product_price = models.FloatField(default=0.0)
    product_category = models.CharField(max_length=200)
    
     def __str__(self):
        return self.product_name
