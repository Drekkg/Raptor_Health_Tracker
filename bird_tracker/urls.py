from . import views
from django.urls import path


urlpatterns = [
    path('', views.BirdList.as_view(), name='home'),
    path('<str:bird_name>/', views.bird_detail, name='daily_data'),


]
