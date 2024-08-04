from .models import DailyData
from .models import Bird
from django import forms


class DailyDataForm(forms.ModelForm):
    class Meta:
        model = DailyData
        fields = ('weight', 'food_type', 'food_weight',
                  'weather', 'temperature', 'training', 'behaviour')


class AddNewBirdForm(forms.ModelForm):
    class Meta:
        model = Bird
        fields = ("bird_name", "type", "sex", "date_of_birth",
                  "additional_info")
