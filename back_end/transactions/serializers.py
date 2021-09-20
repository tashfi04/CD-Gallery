from rest_framework import serializers
from .models import Transaction, Item

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = Item
        fields = ['name', 'inventory_item', 'count', 'price']

class TransactionSerializer(serializers.ModelSerializer):

    item_set = ItemSerializer(many=True)

    class Meta:
        model = Transaction
        fields = ['customer', 'total_price', 'item_set']

    def create(self, validated_data):

        items_data = validated_data.pop('item_set')
        transaction = Transaction.objects.create(**validated_data)

        for item_data in items_data:
            Item.objects.create(transaction=transaction, **item_data)

        return transaction


class TransactionListSerializer(serializers.ModelSerializer):

    customer = serializers.StringRelatedField()

    class Meta:
        model = Transaction
        fields = '__all__'

# {
#     "total_price": 480,
#     "item_set": [
#         {"name": "item1", "count": 1, "price": 10},
#         {"name": "item2", "count": 31, "price": 450},
#         {"name": "item3", "count": 1, "price": 20}
#     ]
# }