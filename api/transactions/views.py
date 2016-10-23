from rest_framework import viewsets
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Transaction objects """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
