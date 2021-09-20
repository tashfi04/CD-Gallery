from django.urls import path, include
from .views import apiOverview

urlpatterns = [

    path('', apiOverview, name="api-overview"),

    path('accounts/', include('accounts.urls')),

    path('customers/', include('customers.urls')),

    path('categories/', include('categories.urls')),

    path('inventory/', include('inventory.urls')),

    path('wishlist/', include('wishlist.urls')),

    path('transactions/', include('transactions.urls'))

]