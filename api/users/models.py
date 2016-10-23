from django.db import models

class User(models.Model):
    """ High-level users user model"""
    tokn = models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    email = models.EmailField(max_length=70,blank=True)
    phone = models.IntegerField(default=100)

    def __str__(self):
        return self.name
