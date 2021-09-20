from django.urls import path

from .views import (
    WishlistCreate,
    WishlistUpdateDelete,
    WishlistList,
    WishlistSearch
)

urlpatterns = [
    path('create/', WishlistCreate.as_view(), name="wishlist-create"),
    path('update_delete/<str:wishlist_pk>/', WishlistUpdateDelete.as_view(), name="wishlist-update-delete"),
    path('list/', WishlistList.as_view(), name="wishlist-list"),
    path('search/<str:search_text>/', WishlistSearch.as_view(), name="wishlist-search")
]
