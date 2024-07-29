from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def bird_detail(request):
    return HttpResponse("Raptor Health Tracker")
