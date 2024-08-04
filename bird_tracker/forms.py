from .models import DailyData
from django import forms


class DailyDataForm(forms.ModelForm):
    class Meta:
        model = DailyData
        fields = ('weight', 'food_type', 'food_weight',
                  'weather', 'temperature', 'training', 'behaviour')
