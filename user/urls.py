from django.urls import path
from user.views import MyTokenObtainPairView

urlpatterns = [
    path('auth/jwt/create/',MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    # path('auth/jwt/refresh/',MyTokenRefreshView.as_view(),name='token_refresh'),
]
