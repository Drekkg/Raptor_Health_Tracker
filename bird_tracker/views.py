from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Bird
from .models import DailyData
from .forms import DailyDataForm
from django.contrib import messages
# Create your views here.


class BirdList(generic.ListView):
    queryset = Bird.objects.all()
    template_name = "bird_tracker/index.html"


def bird_detail(request, bird_name):
    """display alist of the birds details
    ***Template
    bird_tracker/bird_detail.html"""
    queryset = Bird.objects.all()
    bird_detail = get_object_or_404(queryset, bird_name=bird_name)
    selected_bird = bird_detail.selected_bird.all()

    return render(
        request,
        "bird_tracker/bird_detail.html",
        {"bird_detail": bird_detail,
         "selected_bird": selected_bird,

         },
    )


def daily_data_form(request, bird_name):
    """Form
    ***Template
    # bird_tracker/daily_data_form.html"""
    queryset = Bird.objects.all()
    bird_detail = get_object_or_404(queryset, bird_name=bird_name)
    selected_bird = bird_detail.selected_bird.all()

    if request.method == "POST":
        print("recieved a POST request")
        daily_data_form = DailyDataForm(data=request.POST)

        if daily_data_form.is_valid():
            print("valid form")
            daily_data = daily_data_form.save(commit=False)
            daily_data.trainer = request.user
            daily_data.selected_bird = bird_detail
            daily_data.save()

            messages.add_message(
                request, messages.SUCCESS,
                'Daily Data added'
            )
            return render(
                request,
                "bird_tracker/bird_detail.html",
                {"bird_detail": bird_detail,
                 "selected_bird": selected_bird,
                 },
            )

    daily_data_form = DailyDataForm()
    return render(
        request,
        "bird_tracker/daily_data_form.html",
        {
            "daily_data_form": daily_data_form,
            "bird_detail": bird_detail,
            "selected_bird": selected_bird,
        },
    )
