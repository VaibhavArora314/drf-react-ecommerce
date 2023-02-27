from django.shortcuts import render
from django.conf import settings
from rest_framework.viewsets import GenericViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from user.serializers import MyTokenObtainPairSerializer

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# class MyTokenRefreshView(TokenRefreshView):
#     serializer_class = MyTokenRefreshSerializer