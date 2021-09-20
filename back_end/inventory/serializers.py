from rest_framework import serializers
from .models import Inventory
from categories.models import Category

class InventorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = '__all__'

class CategoryySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = '__all__'

class InventorySearchSerializer(serializers.ModelSerializer):

    category = CategoryySerializer(read_only=True)

    class Meta:
        model = Inventory
        fields = ['id', 'item_name', 'description', 'price', 'count', 'category']

class InventoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Inventory
        fields = ['id', 'item_name', 'description', 'price', 'count']

class CategorizedInventoryListSerializer(serializers.ModelSerializer):

    inventory_set = InventoryListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'inventory_set']
        