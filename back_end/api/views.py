from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticatedOrReadOnly])
def apiOverview(request):
    api_urls = {
        'API Overview'                      : 'api/v1/',

        'User Login'                        : 'api/v1/accounts/login/',
        'User Logout'                       : 'api/v1/accounts/logout/',
        'User Registration'                 : 'api/v1/accounts/registration/',

        'Customer List, Create'             : 'api/v1/customers/list_create/',
        'Customer Update, Delete'           : 'api/v1/customers/update_delete/<str:customer_pk>/',
        'Customer Search'                   : 'api/v1/customers/search/<str:search_text>/',

        'Category List, Create'             : 'api/v1/Categories/list_create/',
        'Category Update, Delete'           : 'api/v1/Categories/update_delete/<str:category_pk>/',

        'Inventory Create'                  : 'api/v1/inventory/create/',
        'Inventory Update, Delete'          : 'api/v1/inventory/update_delete/<str:inventory_pk>/',
        'Inventory List'                    : 'api/v1/inventory/list/',
        'Inventory Search'                  : 'api/v1/inventory/search/<str:search_text>/',

        'Wishlist Create'                   : 'api/v1/wishlist/create/',
        'Wishlist Update, Delete'           : 'api/v1/wishlist/update_delete/<str:wishlist_pk>/',
        'Wishlist List'                     : 'api/v1/wishlist/list/',
        'Wishlist Search'                   : 'api/v1/wishlist/search/<str:search_text>/',

        'Transaction Create'                : 'api/v1/transactions/create/',
        'Transaction List'                  : 'api/v1/transactions/list/  '

# Transaction Create json sample
# {
#     "customer": 1
#     "total_price": 480,
#     "item_set": [
#         {"name": "item1", "inventory_item": 1, "count": 1, "price": 10},
#         {"name": "item2", "inventory_item": 1, "count": 31, "price": 450},
#         {"name": "item3", "inventory_item": 1, "count": 1, "price": 20}
#     ]
# }

	}

    return Response(api_urls)
    