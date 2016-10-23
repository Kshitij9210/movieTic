from rest_framework import viewsets
from users.models import User
from users.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing User objects """
    queryset = User.objects.all()
    serializer_class = UserSerializer
