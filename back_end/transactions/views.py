from rest_framework.generics import (
    CreateAPIView,
    ListAPIView
)

from .serializers import (
    TransactionSerializer,
    TransactionListSerializer
)

from .models import Transaction

class TransactionCreate(CreateAPIView):

    serializer_class = TransactionSerializer

class TransactionList(ListAPIView):

    serializer_class = TransactionListSerializer
    queryset = Transaction.objects.all().order_by('id').reverse()