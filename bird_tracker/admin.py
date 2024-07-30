from django.contrib import admin
from .models import Bird
from .models import Daily_data

# Register your models here.
admin.site.register(Bird)
admin.site.register(Daily_data)
