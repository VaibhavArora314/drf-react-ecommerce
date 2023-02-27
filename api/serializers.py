from rest_framework import serializers
from api.models import Product, ShippingAddress, Order, OrderItem
from django.contrib.auth.models import User

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'image', 'brand', 'category', 'description', 'rating', 'numReviews', 'price', 'countInStock', 'createdAt', )


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email')

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many=True)
        return serializer.data
    
    def get_shippingAddress(self,obj):
        item = obj.shippingAddress
        serializer = ShippingAddressSerializer(item)
        return serializer.data

    def get_user(self,obj):        
        user = obj.user
        serializer = UserSerializer(user)
        return serializer.data
