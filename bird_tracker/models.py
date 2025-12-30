from django.db import models
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils.timezone import now


# Constants to be used in the Bird and DailyData Model
SEX = ((0, "Female"), (1, "Male"), (2, "Unknown"))
WEATHER = ((0, "Rainy"), (1, "Sunny"), (2, "Windy"), (3, "Cold"))
TRAINING = ((0, "No Training"), (1, "Faustappel"), (2, "Free Flight"), (3, "Lure Flying"))
BEHAVIOUR = ((0, "Motivated"), (1, "Lethargic"), (2, "Aggressive"), (3, "Unmotivated"), (4, "Slightly Unmotivated"), (5, "Neutral"))
# aggressive, lethargic, unmotivated, slightly unmotivated,
# Bird Custom Model


class Bird(models.Model):
    """
    Stores a single bird instance.foreign key : bird_id
    """
    bird_name = models.CharField(max_length=20, unique=True, blank=False)
    type = models.CharField(max_length=20, blank=False)
    sex = models.IntegerField(choices=SEX, default=0, null=False)
    date_of_birth = models.CharField(max_length=20, default="Unknown")
    target_weight = models.PositiveSmallIntegerField(null=True, blank=True, validators=[
            MinValueValidator(0), 
            MaxValueValidator(20000)   
        ])
    additional_info = models.CharField(max_length=200, blank=False)
    created_on = models.DateTimeField(auto_now_add=True, null=False)
    main_image = CloudinaryField('image', default='placeholder', format='jpg')

    class Meta:
        ordering = ["created_on"]

    def __str__(self):
        return (f"{self.bird_name} | {self.type}")

# Daily data custom model


class DailyData(models.Model):
    """
    Stores a single instance of required
     daily data :model: `selected_bird.Bird`
    :model: `trainer.User`
    """
    selected_bird = models.ForeignKey(
        Bird, on_delete=models.CASCADE, related_name='selected_bird')
    trainer = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='trainer')
    date = models.DateTimeField(default=now, null=False) 
    weight = models.PositiveSmallIntegerField(null=False)
    food_type = models.CharField(max_length=12, blank=False)
    food_weight = models.PositiveSmallIntegerField(null=False)
    food_time = models.TimeField(null=True, blank=True)
    weather = models.IntegerField(choices=WEATHER, default=1, null=False)
    temperature = models.IntegerField(null=False,  validators=[
            MinValueValidator(-50), 
            MaxValueValidator(50)   
        ])
    training = models.IntegerField(choices=TRAINING, default=0, null=False)
    training_time = models.TimeField(null=True, blank=True)
    training_motivation = models.IntegerField(null=True, blank=True, validators = [
        MinValueValidator(1),
        MaxValueValidator(10)
    ])
    behaviour = models.IntegerField(choices=BEHAVIOUR, default=0, null=False)
    notable_info = models.CharField(
        max_length=200, blank=False, default="None")
    notable_image = CloudinaryField('image', default='placeholder')

    class Meta:
        ordering = ["-date"]

    def __str__(self):
        return (f"Bird {self.selected_bird} Trained by {self.trainer} | {self.date}")  # noqa
