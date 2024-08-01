from django.db import models
from django.contrib.auth.models import User

SEX = ((0, "Female"), (1, "Male"))
WEATHER = ((0, "Rainy"), (1, "Sunny"), (2, "Windy"), (3, "Cold"))
TRAINING = ((0, "Featherplay"), (1, "Faustappel"))
BEHAVIOUR = ((0, "Motivated"), (1, "Reticent"))

# Create your models here.


class Bird(models.Model):

    bird_name = models.CharField(max_length=20, unique=True)
    type = models.CharField(max_length=20)
    sex = models.IntegerField(choices=SEX, default=0)
    date_of_birth = models.DateField()
    additional_info = models.CharField(max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return (f"{self.bird_name} | {self.type}")


class Daily_data(models.Model):
    selected_bird = models.ForeignKey(
        Bird, on_delete=models.CASCADE, related_name='selected_bird')
    trainer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='trainer')
    date = models.DateTimeField(auto_now=True)
    weight = models.IntegerField()
    food_type = models.CharField(max_length=12)
    food_weight = models.IntegerField()
    weather = models.IntegerField(choices=WEATHER, default=1)
    temp = models.IntegerField()
    training = models.IntegerField(choices=TRAINING, default=0)
    behaviour = models.IntegerField(choices=BEHAVIOUR, default=0)

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return (f"Bird {self.selected_bird} Trained by {self.trainer} | {self.date}")
