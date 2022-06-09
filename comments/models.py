from django.db import models

# Create your models here.

class Comment(models.Model):
    text = models.TextField(max_length=400)
    rating = models.PositiveIntegerField(default=None)
    animal = models.ForeignKey(
        'animals.Animal',
        related_name='comments',
        on_delete=models.CASCADE
    )
    added_by = models.ForeignKey(
        'jwt_auth.User',
        related_name='comments',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)