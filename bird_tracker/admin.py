from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Bird
from .models import DailyData


# Register your models here.
admin.site.register(Bird)
admin.site.register(DailyData)
