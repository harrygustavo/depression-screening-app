from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token  # Add this import
from .views import UserCreateView, login_view, PHQ9ResultCreateView, PHQ9ResultListView, LogoutView
from . import views

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register_user'),  # Endpoint for registering new users
    path('login/', login_view, name='login'),  # Endpoint for user login
    path('logout/', LogoutView.as_view(), name='logout'),
    path('get-token/', obtain_auth_token, name='get_token'),  # Endpoint for obtaining auth token
    path('phq9/create/', PHQ9ResultCreateView.as_view(), name='phq9_create'),  # Endpoint for creating new PHQ9 results
    path('phq9/list/', PHQ9ResultListView.as_view(), name='phq9_list'),  # Endpoint for listing all PHQ9 results
    path('clinics/', views.get_clinics, name='get_clinics'),
]
