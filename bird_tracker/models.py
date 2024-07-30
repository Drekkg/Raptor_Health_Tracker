from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Bird(models.Model):
    bird_name = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=20, unique=True)
    birth_date = models.IntegerField()
    additional_info = models.CharField(max_length=200)
