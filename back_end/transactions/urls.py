from django.urls import path

from .views import (
    TransactionCreate,
    TransactionList
)

urlpatterns = [
    path('create/', TransactionCreate.as_view(), name="transcation-create"),
    path('list/', TransactionList.as_view(), name="transcation-list")
]
