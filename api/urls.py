from django.urls import path
from rest_framework.routers import DefaultRouter

from api.views import OrderViewSet, ProductViewSet, placeOrder, updateOrderToPaid

router = DefaultRouter()
router.register('products', ProductViewSet, basename='products')
router.register('orders', OrderViewSet, basename='orders')

urlpatterns = [*router.urls,
               path('placeorder/', placeOrder, name='create-order'),
               path('/orders/<str:pk>/pay', updateOrderToPaid, name="pay"),
               ]
