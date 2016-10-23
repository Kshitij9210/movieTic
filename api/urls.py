"""movieTic URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
# importing the core
from django.conf.urls import url
from django.conf.urls import include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
# importing models
from products.models import Product
from transactions.models import Transaction
from users.models import User
# importing viewsets
from products.views import ProductViewSet
from transactions.views import TransactionViewSet
from users.views import UserViewSet

# registering api views to router
router = DefaultRouter()

router.register(prefix='products', viewset=ProductViewSet)
router.register(prefix='transactions', viewset=TransactionViewSet)
router.register(prefix='users', viewset=UserViewSet)

# registering models to admin
admin.site.register(Product)
admin.site.register(Transaction)
admin.site.register(User)

# the link to the awesome
urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
]
