from rest_framework import viewsets
from rest_framework.generics import GenericAPIView
from transactions.models import Transaction
from transactions.serializers import TransactionSerializer
import stripe
from rest_framework import status
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import permission_classes
stripe.api_key = "pk_test_hsDZvz0HBvy5vXNaGPWDdvW8"

class TransactionViewSet(viewsets.ModelViewSet):
    """ ViewSet for viewing and editing Transaction objects """
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

@permission_classes(())
class PaymentView(GenericAPIView):

    permission_classes = ()

    def post(self, request, *args, **kwargs):
        token = request.POST.get('stripeToken', None)
        if token is None:
            return Response(data='stripeToken is missing',status=status.HTTP_400_BAD_REQUEST)
        customer = stripe.Customer.create(
            source=token,
            description='Example Customer'
        )
        stripe.Charge.create(
            amount=1000,
            currency='usd',
            customer=customer.id
        )
