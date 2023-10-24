from django.contrib.auth.models import User
from django.test import TestCase
from .models import UserProfile, PHQ9_Result

class UserProfileTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.userprofile = UserProfile.objects.create(user=self.user, zip_code="12345")

    def test_userprofile_creation(self):
        self.assertEqual(self.user.profile.zip_code, "12345")

class PHQ9ResultTest(TestCase):
    
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.phq9_result = PHQ9_Result.objects.create(user=self.user, total_score=15, question_9_score=3)

    def test_phq9_result_creation(self):
        self.assertEqual(self.phq9_result.total_score, 15)
        self.assertEqual(self.phq9_result.question_9_score, 3)

    def test_phq9_result_string_representation(self):
        self.assertIn(self.user.username, str(self.phq9_result))
