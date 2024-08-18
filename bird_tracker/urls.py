from . import views
from django.urls import path, include

# the urls for the respective views
urlpatterns = [
    path('', views.BirdList.as_view(), name='home'),
    path('daily_data_forms/<int:id>', views.daily_data_form, name='daily_data_form'),  # noqa
    path('add_new_bird_form/', views.add_new_bird_form, name='add_new_bird_form'),  # noqa
    path('bird_detail/<int:id>/', views.bird_detail, name='bird_detail'),
    path('<int:id>/edit_bird/', views.bird_edit, name='bird_edit'),   # noqa
    path('bird_detail/<int:id>/delete_bird/', views.bird_delete, name='bird_delete'),   # noqa

]
