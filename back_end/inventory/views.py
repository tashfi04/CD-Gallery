from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView
)

from .serializers import (
    InventorySerializer,
    CategorizedInventoryListSerializer,
    InventorySearchSerializer
)
from .models import Inventory
from categories.models import Category

class InventoryCreate(CreateAPIView):

    serializer_class = InventorySerializer

class InventoryUpdateDelete(RetrieveUpdateDestroyAPIView):

    lookup_url_kwarg = 'inventory_pk'

    serializer_class = InventorySerializer
    
    def get_queryset(self):
        return Inventory.objects.filter(id=self.kwargs["inventory_pk"])

class InventoryList(ListAPIView):

    serializer_class = CategorizedInventoryListSerializer
    queryset = Category.objects.all()

class InventorySearch(ListAPIView):

    lookup_url_kwarg = 'search_text'

    serializer_class = InventorySearchSerializer

    def get_queryset(self):
        return Inventory.objects.filter(item_name__icontains=self.kwargs["search_text"])
