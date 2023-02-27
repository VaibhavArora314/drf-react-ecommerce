from datetime import datetime
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from api.models import Order, OrderItem, Product, ShippingAddress
from api.permissions import IsAdminUserOrReadOnly
from api.serializers import OrderSerializer, ProductSerializer
from django.db import transaction
from django.shortcuts import get_object_or_404

class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def placeOrder(request):
    user = request.user
    data = request.data

    orderItems = data['orderItems']

    if not orderItems or len(orderItems) == 0:
        return Response({'detail': 'No Order items'}, status=status.HTTP_400_BAD_REQUEST)

    with transaction.atomic():
        order = Order.objects.create(user=user, paymentMethod=data['paymentMethod'], taxPrice=data['taxPrice'],
                                     shippingPrice=data['shippingPrice'], totalPrice=data['totalPrice'])

        shippingAddress = ShippingAddress.objects.create(order=order, address=data['shippingAddress']['address'], city=data['shippingAddress']
                                                         ['city'], postalCode=data['shippingAddress']['postalCode'], country=data['shippingAddress']['country'],)

        for x in orderItems:
            product = Product.objects.get(id=x['id'])

            item = OrderItem.objects.create(
                product=product,
                order=order,
                productName=product.name,
                qty=x['qty'],
                price=product.price,
                image=product.image.name
            )

            product.countInStock -= x['qty']
            product.save()

        serializer = OrderSerializer(order)
        return Response(serializer.data)


class OrderViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    def get_queryset(self):
        if (self.request.user.is_staff):
            return Order.objects.all()
        return Order.objects.filter(user=self.request.user)
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request,pk):
    order = get_object_or_404(Order,id=pk)
    if (Order.isPaid): 
        return Response("Order was already paid!")
    order.isPaid=True
    order.paidAt=datetime.now()
    order.save()
    return Response('Order was paid!')