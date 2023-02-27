from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from djoser.serializers import UserSerializer, User
from djoser.conf import settings
from django.contrib.auth.hashers import make_password

class MyUserSerializer(UserSerializer):
    class Meta(UserSerializer.Meta):
        fields = ('id','email','username','password')
        read_only_fields = ()
        extra_kwargs = {
            'password': {'write_only': True, 'required': False},
        }
    
    def update(self, instance, validated_data):
        if (validated_data.get('password')):
            validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        data['username'] = self.user.username
        data['email'] = self.user.email
        data['isAdmin'] = self.user.is_staff

        return data
    
# class MyTokenRefreshSerializer(TokenRefreshSerializer):
#     def validate(self, attrs):
#         data = super().validate(attrs)

#         data['username'] = self.user.username
#         data['email'] = self.user.email
#         data['isAdmin'] = self.user.is_staff

#         return data