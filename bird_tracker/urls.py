from . import views
from django.urls import path


urlpatterns = [
    path('', views.BirdList.as_view(), name='home'),
    path('daily_data_forms/<str:bird_name>',
         views.daily_data_form, name='daily_data_form'),
    path('<str:bird_name>/', views.bird_detail, name='bird_detail'),


]
