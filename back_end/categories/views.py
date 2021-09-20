from rest_framework.generics import (
    ListCreateAPIView,
    RetrieveUpdateDestroyAPIView
)

from .serializers import (
    CategorySerializer
)
from .models import Category

class CategoryListCreate(ListCreateAPIView):

    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class CategoryUpdateDelete(RetrieveUpdateDestroyAPIView):

    lookup_url_kwarg = 'category_pk'

    serializer_class = CategorySerializer
    
    def get_queryset(self):
        return Category.objects.filter(id=self.kwargs["category_pk"])
