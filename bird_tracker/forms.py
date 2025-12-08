from .models import DailyData
from .models import Bird
from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Field


# unicode for degree celsius
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
        fields = ('weight', 'food_type', 'food_weight', 'food_time',
                  'weather', 'temperature', 'training', 'training_motivation', 'training_time', 'behaviour',
                  'notable_info', 'notable_image')
        labels = {
            'weight': 'Weight:  (please enter the bird\'s weight in grams)',
            'food_type': 'Food Type:  (mouse, chicken, etc)',
            'food_weight': 'Food Weight:  (food weight in grams)',
            'food_time': 'Feeding Time: (time of feeding)',
            'temperature': 'Temperature:  (the air temperature in °C)',
            'training': 'Training  (the type of training that was performed)',
            'training_time': 'Time of Training:  (time of the Training)',
            'behaviour': 'Behaviour  (the general mood of the bird)',
            'notable_info': 'Notable Information (any extra info - missing feathers, injuries, loss of appetite, moulting etc)',  # noqa
            'notable_image': 'Add an image of anything noteworthy',
        }
        widgets = {
            'training_motivation': forms.HiddenInput(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            'weight',
            'food_type',
            'food_weight',
            'food_time',
            'weather',
            'temperature',
            'training',
            Field('training_motivation', type="hidden"),  # Explicitly set as hidden
            'training_time',
            'behaviour',
            'notable_info',
            'notable_image',
        )