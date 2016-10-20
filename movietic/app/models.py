from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.utils.encoding import python_2_unicode_compatible

# Create your models here.

@python_2_unicode_compatible
class UserProfile(models.Model):
    user = models.OneToOneField(User)
    phone = models.CharField(max_length=16)
    address = models.CharField(max_length=255)
    customer_id = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

    class Meta:
        app_label = 'app'

    def toArr(self):
        return {
            'username':self.user.username,
            'first_name':self.user.first_name,
            'last_name':self.user.last_name,
            'email':self.user.email,
            'address':self.address,
            'phone':self.phone
        }


@python_2_unicode_compatible
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.CharField(max_length = 20)
    customer_id =  models.CharField(max_length=255)
    trans_Id =  models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

    class Meta:
        app_label = 'app'

    def toArr(self):
        return {
            'username':self.user.username,
            'first_name':self.user.first_name,
            'last_name':self.user.last_name,
            'email':self.user.email,
            'amount':self.amount,
            'trans_Id':self.trans_Id
        }
