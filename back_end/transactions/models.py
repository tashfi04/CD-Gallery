from django.db import models
from django.db.models import F
from inventory.models import Inventory

class Transaction(models.Model):

    customer = models.ForeignKey('customers.Customer', on_delete=models.CASCADE, null=True, blank=True)
    total_price = models.PositiveIntegerField(null=True, blank=False)#, unique=True)

    def __str__(self):
        return str(self.id)

class Item(models.Model):

    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    inventory_item = models.ForeignKey('inventory.Inventory', on_delete=models.CASCADE, null=True, blank=False)
    name = models.CharField(max_length=200, null=True, blank=False)
    count = models.PositiveIntegerField(null=True, blank=False)
    price = models.PositiveIntegerField(null=True, blank=False)

    def save(self, *args, **kwargs):
        Inventory.objects.filter(id=self.inventory_item_id).update(count=F('count') - self.count)

    def __str__(self):
        return self.name


# {
#     'total_price': '30',
#     'items': [
#         {'name': item1, 'count': '1', 'price': 11},
#         {'name': item2, 'count': '2', 'price': 10},
#         {'name': item3, 'count': '3', 'price': 9},
#     ],
# }

# {
#     "total_price": 30,
#     "items": [
#         {"name": item1, "count": 1, "price": 11},
#         {"name": item2, "count": 2, "price": 10},
#         {"name": item3, "count": 3, "price": 9},
#     ],
# }