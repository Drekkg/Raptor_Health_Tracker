from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Bird
# Create your views here.


class BirdList(generic.ListView):
    queryset = Bird.objects.all()
    template_name = "bird_tracker/index.html"
