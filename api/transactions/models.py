from django.db import models
from datetime import datetime
from django.contrib.auth.models import User
from products.models import Product

class Transaction(models.Model):
    """ High-level transactions transaction model"""
    user = models.ForeignKey(User)
    product = models.ForeignKey(Product)
    amount = models.IntegerField(default=100)
    datetime = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.amount
