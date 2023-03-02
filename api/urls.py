from django.urls import path
from rest_framework.routers import DefaultRouter

from api.views import BrandViewSet, CategoryViewSet, OrderViewSet, ProductViewSet, ReviewView, StripePaymentView, placeOrder, updateOrderToPaid

router = DefaultRouter()
router.register('brands', BrandViewSet, basename='brands')
router.register('category', CategoryViewSet, basename='category')
router.register('products', ProductViewSet, basename='products')
router.register('orders', OrderViewSet, basename='orders')

urlpatterns = [*router.urls,
    path('placeorder/', placeOrder, name='create-order'),
    path('orders/<str:pk>/pay/', updateOrderToPaid, name="pay"),
    path('stripe-payment/', StripePaymentView.as_view(),
        name='stipe-payment'),
    path('products/<str:pk>/reviews/', ReviewView.as_view(), name='product-reviews'),
]
