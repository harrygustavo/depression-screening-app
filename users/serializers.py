from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile
from .models import PHQ9_Result
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, PHQ9_Result



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('zip_code',)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=255, required=True)
    password = serializers.CharField(max_length=255, write_only=True, required=True)



class PHQ9ResultSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # Include this line

    class Meta:
        model = PHQ9_Result
        fields = '__all__'

