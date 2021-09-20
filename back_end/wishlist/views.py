from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveUpdateDestroyAPIView
)

from .serializers import (
    WishlistSerializer,
    WishlistUpdateDeleteSerializer,
    CategorizedWishlistListSerializer,
    WishlistSearchSerializer
)
from .models import Wishlist
from categories.models import Category

class WishlistCreate(CreateAPIView):

    serializer_class = WishlistSerializer

class WishlistUpdateDelete(RetrieveUpdateDestroyAPIView):

    lookup_url_kwarg = 'wishlist_pk'

    serializer_class = WishlistUpdateDeleteSerializer

    def get_queryset(self):
        return Wishlist.objects.filter(id=self.kwargs["wishlist_pk"])

class WishlistList(ListAPIView):

    serializer_class = CategorizedWishlistListSerializer
    queryset = Category.objects.all()

class WishlistSearch(ListAPIView):

    lookup_url_kwarg = 'search_text'

    serializer_class = WishlistSearchSerializer

    def get_queryset(self):
        return Wishlist.objects.filter(item_name__icontains=self.kwargs["search_text"])
