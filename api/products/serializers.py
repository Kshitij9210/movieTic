from rest_framework import serializers
from products.models import Product

class ProductSerializer(serializers.ModelSerializer):
    """ Serializer to represent the products model """
    class Meta:
        model = Product
        fields = ("id","name", "desc", "price", "imgsrc")
