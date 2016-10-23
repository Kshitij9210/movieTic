from rest_framework import viewsets
from products.models import Product
from products.serializers import ProductSerializer


class ProductViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Product objects """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
