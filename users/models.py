from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    
    def __str__(self):
        return self.user.username


class PHQ9_Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='phq9_results')
    total_score = models.IntegerField()
    question_9_score = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result for {self.user.username} at {self.timestamp}"
