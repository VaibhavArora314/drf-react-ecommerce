from datetime import datetime
from django.conf import settings
from rest_framework.viewsets import ModelViewSet, GenericViewSet
from rest_framework.views import APIView
from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, CreateModelMixin
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from api.models import Brand, Category, Order, OrderItem, Product, Review, ShippingAddress
from api.permissions import IsAdminUserOrReadOnly
from api.serializers import BrandSerializer, CategorySerializer, OrderSerializer, ProductSerializer, ReviewSerializer
from django.db import transaction
from django.shortcuts import get_object_or_404, redirect
import stripe


class BrandViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class CategoryViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAdminUserOrReadOnly]


class ReviewView(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, pk):
        data = request.data
        user = request.user

        product = get_object_or_404(Product, id=pk)
        reviews = product.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, pk):
        data = request.data
        user = request.user

        product = get_object_or_404(Product, id=pk)

        alreadyExists = product.review_set.filter(user=user).exists()

        if alreadyExists:
            return Response({'detail': 'Product Already Reviewed!'}, status=status.HTTP_400_BAD_REQUEST)

        if data['rating'] == 0:
            return Response({'detail': 'Please select a rating from 1 to 5!'}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            review = Review.objects.create(
                product=product,
                user=user,
                name=user.username,
                rating=data['rating'],
                comment=data['comment'],
            )

            product.rating = (product.rating * product.numReviews +
                              data['rating'])/(product.numReviews + 1)
            product.numReviews += 1
            product.save()

            serializer = ReviewSerializer(review)

            return Response(serializer.data, status=status.HTTP_201_CREATED)


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


stripe.api_key = settings.STRIPE_API_KEY


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):

    payment_intent = stripe.PaymentIntent.retrieve(
        request.data['payment_intent'])

    if payment_intent.status == "succeeded":
        order = get_object_or_404(Order, id=pk)
        order.isPaid = True
        order.paidAt = datetime.now()
        order.save()
        return Response('Payment was successful completed!')

    return Response('An unexpected error occurred! Please contact our customer care.')


class StripePaymentView(APIView):
    def post(self, request):
        try:
            # print(request.data)
            order = get_object_or_404(Order, id=request.data['order'])
            intent = stripe.PaymentIntent.create(
                amount=int(order.totalPrice*100),
                currency='inr',
                automatic_payment_methods={
                    'enabled': True,
                }
            )

            return Response({'clientSecret': intent['client_secret']})
        except Exception as e:
            print(e)
            return Response({'error': 'Something went wrong while creating stripe checkout session!'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
