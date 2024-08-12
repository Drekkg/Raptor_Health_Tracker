from .models import DailyData
from .models import Bird
from django import forms

deg = '\u00B0C'


class AddNewBirdForm(forms.ModelForm):
    class Meta:
        model = Bird
        fields = ('bird_name', 'type', 'sex', 'date_of_birth',
                  'additional_info', 'main_image')
        labels = {
            'date_of_birth': 'Date of Birth:      format: YYYY-MM-DD'
        }


class DailyDataForm(forms.ModelForm):
    class Meta:
        model = DailyData
        fields = ('weight', 'food_type', 'food_weight',
                  'weather', 'temperature', 'training', 'behaviour', 'notable_info', 'notable_image')
        labels = {
            'weight': 'Weight:  (please enter the bird\'s weight in grams)',
            'food_type': 'Food Type:  (mouse, chicken, etc)',
            'food_weight': 'Weight:  (food weight in grams)',
            'temperature': 'Temparature:  (the air temperature in' + deg + ')',
            'training': 'Training  (the type of training that was performed)',
            'behaviour': 'Behaviour  (the general mood of the bird)',
            'notable_info': 'Notable Information (any extra info - missing feathers, injuries, loss of appetite, moulting etc)',
            'notable_image': 'add an image of anything noteworthy',


        }
