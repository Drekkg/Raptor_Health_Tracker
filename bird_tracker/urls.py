from . import views
from django.urls import path


urlpatterns = [
    path('', views.BirdList.as_view(), name='home'),
]
