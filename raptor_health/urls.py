"""
URL configuration for raptor_health project.
"""
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('accounts/', include("allauth.urls")),
    path('admin/', admin.site.urls),
    path('', include("bird_tracker.urls")),
]
