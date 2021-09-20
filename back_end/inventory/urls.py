from django.urls import path

from .views import (
    InventoryCreate,
    InventoryUpdateDelete,
    InventoryList,
    InventorySearch
)

urlpatterns = [
    path('create/', InventoryCreate.as_view(), name="inventory-create"),
    path('update_delete/<str:inventory_pk>/', InventoryUpdateDelete.as_view(), name="inventory-update-delete"),
    path('list/', InventoryList.as_view(), name="inventory-list"),
    path('search/<str:search_text>/', InventorySearch.as_view(), name="inventory-search")
]
