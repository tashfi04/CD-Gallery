from rest_framework import serializers
from .models import Wishlist
from categories.models import Category

class WishlistSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wishlist
        fields = '__all__'

class WishlistUpdateDeleteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wishlist
        fields = ['item_name', 'description', 'user_request_count']

class WishlistSearchSerializer(serializers.ModelSerializer):

    category = serializers.StringRelatedField()

    class Meta:
        model = Wishlist
        fields = '__all__'

class WishlistListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Wishlist
        fields = ['id', 'item_name', 'description', 'user_request_count']

class CategorizedWishlistListSerializer(serializers.ModelSerializer):

    wishlist_set = WishlistListSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'wishlist_set']
        