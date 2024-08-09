from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

SEX = ((0, "Female"), (1, "Male"))
WEATHER = ((0, "Rainy"), (1, "Sunny"), (2, "Windy"), (3, "Cold"))
TRAINING = ((0, "Featherplay"), (1, "Faustappel"), (2, "Free Flight"))
BEHAVIOUR = ((0, "Motivated"), (1, "Reticent"))

# Create your models here.


class Bird(models.Model):

    bird_name = models.CharField(max_length=20, unique=True, blank=False)
    type = models.CharField(max_length=20, blank=False)
    sex = models.IntegerField(choices=SEX, default=0, null=False)
    date_of_birth = models.DateField(null=False)
    additional_info = models.CharField(max_length=200, blank=False)
    created_on = models.DateTimeField(auto_now_add=True, null=False)
    main_image = CloudinaryField('image', default='placeholder')

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return (f"{self.bird_name} | {self.type}")


class DailyData(models.Model):
    selected_bird = models.ForeignKey(
        Bird, on_delete=models.CASCADE, related_name='selected_bird')
    trainer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='trainer')
    date = models.DateTimeField(auto_now=True, null=False,)
    weight = models.PositiveSmallIntegerField(null=False)
    food_type = models.CharField(max_length=12, blank=False)
    food_weight = models.PositiveSmallIntegerField(null=False)
    weather = models.IntegerField(choices=WEATHER, default=1, null=False)
    temperature = models.IntegerField(null=False)
    training = models.IntegerField(choices=TRAINING, default=0, null=False)
    behaviour = models.IntegerField(choices=BEHAVIOUR, default=0, null=False)
    notable_info = models.CharField(max_length=200, blank=False, default="")
    notable_image = CloudinaryField('image', default='placeholder')

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return (f"Bird {self.selected_bird} Trained by {self.trainer} | {self.date}")
