from django.urls import path

from .views import (
    CategoryListCreate,
    CategoryUpdateDelete
)

urlpatterns = [
    path('list_create/', CategoryListCreate.as_view(), name="category-list-create"),
    path('update_delete/<str:category_pk>/', CategoryUpdateDelete.as_view(), name="category-update-delete")
]
