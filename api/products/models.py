from django.db import models

class Product(models.Model):
    """ High-level products product model"""
    name = models.CharField(max_length=100)
    desc = models.CharField(max_length=1000)
    price = models.IntegerField(default=0)
    imgsrc = models.CharField(max_length=100)

    def __str__(self):
        return self.name
