from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Bird
from .models import Daily_data
# Create your views here.


class BirdList(generic.ListView):
    queryset = Bird.objects.all()
    template_name = "bird_tracker/index.html"


def bird_detail(request, bird_name):
    """display alist of the birds details
    ***Template 
    bird_tracker/daily_detail.html"""
    queryset = Bird.objects.all()
    bird_detail = get_object_or_404(queryset, bird_name=bird_name)
    daily_detail = bird_detail.selected_bird.all()

    return render(
        request,
        "bird_tracker/daily_detail.html",
        {"bird_detail": bird_detail,
         "daily_detail": daily_detail,
         },
    )
