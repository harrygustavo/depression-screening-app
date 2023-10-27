from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import User, UserProfile, PHQ9_Result
from .serializers import UserSerializer, PHQ9ResultSerializer, UserProfileSerializer, LoginSerializer
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.http import JsonResponse, HttpResponseBadRequest
import requests
from dotenv import load_dotenv
import os
load_dotenv() 




class UserCreateView(generics.CreateAPIView):
    serializer_class = UserSerializer
    
    @permission_classes([AllowAny])
    def create(self, request, *args, **kwargs):
        data = request.data.copy()

        username = data.get('username', '')
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        password = data.get('password')
        if password:
            data['password'] = make_password(password)
        else:
            return Response({'error': 'Password is required.'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        user = User.objects.get(username=username)

        token, created = Token.objects.get_or_create(user=user)

        return Response({'token': token.key}, status=status.HTTP_201_CREATED, headers=headers)



class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

@api_view(['POST'])
def custom_obtain_auth_token(request):
    serializer = LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    username = serializer.validated_data['username']
    password = serializer.validated_data['password']

    user = authenticate(username=username, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'detail': 'Login Successful'}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)



class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()  # Deleting the token
        return Response(status=status.HTTP_200_OK)
    
class PHQ9ResultCreateView(generics.CreateAPIView):
    queryset = PHQ9_Result.objects.all()
    serializer_class = PHQ9ResultSerializer
    permission_classes = [IsAuthenticated]




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_phq9_result(request):
    serializer = PHQ9ResultSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PHQ9ResultListView(generics.ListAPIView):
    serializer_class = PHQ9ResultSerializer
    permission_classes = [IsAuthenticated]  # Ensuring that only authenticated users can access the view

    def get_queryset(self):
        """
        This view should return a list of all the PHQ9 results
        for the currently authenticated user.
        """
        user = self.request.user  # Getting the currently logged-in user
        return PHQ9_Result.objects.filter(user=user)

def get_clinics(request):
    latitude = request.GET.get('latitude')
    longitude = request.GET.get('longitude')
    
    if not latitude or not longitude:
        return HttpResponseBadRequest("Latitude and longitude are required.")
    
    API_KEY = os.getenv('API_KEY')  # Getting the API key from environment variable
    apiUrl = f"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location={latitude},{longitude}&radius=5000&type=clinic&keyword=Veterans%20Affairs&key={API_KEY}"
    
    try:
        response = requests.get(apiUrl)
        response.raise_for_status()  # Raise an HTTPError if the HTTP request returned an unsuccessful status code.
    except requests.exceptions.RequestException as e:
        return JsonResponse({"error": str(e)})
    
    return JsonResponse(response.json())
