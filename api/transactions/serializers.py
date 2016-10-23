from rest_framework import serializers
from transactions.models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
    """ Serializer to represent the transactions model """
    class Meta:
        model = Transaction
        fields = ("id","user", "product", "amount","datetime")
