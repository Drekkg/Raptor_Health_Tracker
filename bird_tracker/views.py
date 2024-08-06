from django.shortcuts import render, get_object_or_404, reverse
from django.http import HttpResponse
from django.shortcuts import render
from django.views import generic
from .models import Bird, DailyData
from .forms import AddNewBirdForm, DailyDataForm
from django.contrib import messages
from django.http import HttpResponseRedirect


class BirdList(generic.ListView):
    queryset = Bird.objects.all()
    template_name = "bird_tracker/index.html"


def bird_detail(request, id):
    """display alist of the birds details
    ***Template
    bird_tracker/bird_detail.html"""
    queryset = Bird.objects.all()
    bird_detail = get_object_or_404(queryset, id=id)
    selected_bird = bird_detail.selected_bird.all()

    return render(
        request,
        "bird_tracker/bird_detail.html",
        {"bird_detail": bird_detail,
         "selected_bird": selected_bird,

         },
    )


def daily_data_form(request, id):
    """Form
    ***Template
    # bird_tracker/daily_data_form.html"""
    queryset = Bird.objects.all()
    bird_detail = get_object_or_404(queryset, id=id)
    selected_bird = bird_detail.selected_bird.all()

    if request.method == "POST":
        daily_data_form = DailyDataForm(data=request.POST)

        if daily_data_form.is_valid():
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
        else:
            messages.add_message(
                request, messages.SUCCESS,
                'Please check the entered Data'
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


def add_new_bird_form(request):
    """Form
    ***Template
    # bird_tracker/add_new_bird_form"""
    queryset = Bird.objects.all()

    if request.method == "POST":
        add_new_bird_form = AddNewBirdForm(data=request.POST)

        if add_new_bird_form.is_valid():
            new_bird = add_new_bird_form.save()
            messages.add_message(
                request, messages.SUCCESS,
                'New Bird added'
            )
            add_new_bird_form = AddNewBirdForm()
            return render(
                request,
                "bird_tracker/add_new_bird_form.html",
                {
                    "view": "add",
                    "add_new_bird_form": add_new_bird_form,

                },
            )
        else:
            messages.add_message(
                request, messages.SUCCESS,
                'Please check the entered Data'
            )

    add_new_bird_form = AddNewBirdForm(data=request.POST)
    return render(
        request,
        "bird_tracker/add_new_bird_form.html",
        {
            "view": "add",
            "add_new_bird_form": add_new_bird_form,

        },
    )


def bird_edit(request, id):
    """
    View to edit bird information.
    """
    # Retrieve the bird instance outside the if statement to avoid duplication
    queryset = Bird.objects.all()
    bird = get_object_or_404(queryset, id=id)
    context = {"view": "edit_bird"}

    if request.method == "POST":
        # Initialize the form with POST data and the specific bird instance
        edit_bird_form = AddNewBirdForm(request.POST, instance=bird)
        if edit_bird_form.is_valid():
            edit_bird_form.save()
            messages.success(request, 'Bird Updated!')
            # Redirect to a success page or detail view of the bird
            return HttpResponseRedirect(reverse('bird_detail', args=[id]))
        else:
            messages.error(request, 'Error updating bird!')
    else:
        # Initialize the form with the bird instance for GET requests
        edit_bird_form = AddNewBirdForm(instance=bird)

    return render(
        request,
        "bird_tracker/add_new_bird_form.html",
        {
            "view": "edit",
            "edit_bird_form": edit_bird_form,
        },
    )
