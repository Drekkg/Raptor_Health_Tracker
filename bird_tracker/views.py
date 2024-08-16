from django.shortcuts import render, get_object_or_404, reverse
from django.http import HttpResponse
import os
from django.shortcuts import render
from django.views import generic
from .models import Bird, DailyData
from .forms import AddNewBirdForm, DailyDataForm
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required, permission_required
from cloudinary.exceptions import Error as CloudinaryError


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
    """Form handler for adding daily data for a bird."""
    bird_detail = get_object_or_404(Bird, id=id)
    selected_bird = bird_detail.selected_bird.all()

    if request.method == "POST":
        form = DailyDataForm(request.POST, request.FILES)
        if form.is_valid():
            daily_data = form.save(commit=False)
            daily_data.trainer = request.user
            daily_data.selected_bird = bird_detail
            daily_data.save()
            messages.success(request, 'Daily Data added successfully.')
            return render(request, "bird_tracker/bird_detail.html",
                          {"bird_detail": bird_detail, "selected_bird": selected_bird})
        elif not form.is_valid():
            messages.error(request, 'Please check the entered data.')
            form = DailyDataForm(request.POST)
            return render(request, "bird_tracker/daily_data_form.html",
                          {"daily_data_form": form, "bird_detail": bird_detail, "selected_bird": selected_bird})

    else:
        form = DailyDataForm()
        return render(request, "bird_tracker/daily_data_form.html",
                      {"daily_data_form": form, "bird_detail": bird_detail, "selected_bird": selected_bird})


# def add_new_bird_form(request):
#     """Form
#     ***Template
#     # bird_tracker/add_new_bird_form"""
#     queryset = Bird.objects.all()
#     if request.method == "POST":
#         add_new_bird_form = AddNewBirdForm(request.POST, request.FILES)
#         if add_new_bird_form.is_valid():
#             new_bird = add_new_bird_form.save()
#             messages.add_message(
#                 request, messages.SUCCESS,
#                 'New Bird added'
#             )

#             return HttpResponseRedirect(reverse('home'))

#         else:
#             messages.add_message(
#                 request, messages.ERROR,
#                 'Please check the entered Data'
#             )
#             add_new_bird_form = AddNewBirdForm(data=request.POST)
#             return render(
#                 request,
#                 "bird_tracker/add_new_bird_form.html",
#                 {
#                     "view": "add",
#                     "add_new_bird_form": add_new_bird_form,

#                 },
#             )

#     add_new_bird_form = AddNewBirdForm()
#     return render(
#         request,
#         "bird_tracker/add_new_bird_form.html",
#         {
#             "view": "add",
#             "add_new_bird_form": add_new_bird_form,

#         },
#     )
# from django.shortcuts import render, redirect
# from django.http import HttpResponseRedirect
# from django.urls import reverse
# from django.contrib import messages
# from .forms import AddNewBirdForm  # Assuming this is the correct import for your form
# from cloudinary.exceptions import Error as CloudinaryError

def add_new_bird_form(request):
    """Form
    ***Template
    # bird_tracker/add_new_bird_form"""
    if request.method == "POST":
        add_new_bird_form = AddNewBirdForm(request.POST, request.FILES)
        if add_new_bird_form.is_valid():
            try:
                new_bird = add_new_bird_form.save()
                messages.add_message(
                    request, messages.SUCCESS,
                    'New Bird added'
                )
                return HttpResponseRedirect(reverse('home'))
            except CloudinaryError as e:

                messages.add_message(
                    request, messages.ERROR,
                    f'Error uploading image: {str(e)}'
                )

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
                request, messages.ERROR,
                'Please check the entered Data'
            )

            add_new_bird_form = AddNewBirdForm(request.POST, request.FILES)
            return render(
                request,
                "bird_tracker/add_new_bird_form.html",
                {
                    "view": "add",
                    "add_new_bird_form": add_new_bird_form,
                },
            )

    else:
        add_new_bird_form = AddNewBirdForm()
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
        edit_bird_form = AddNewBirdForm(
            request.POST, request.FILES, instance=bird)
        if edit_bird_form.is_valid():
            try:
                edit_bird_form.save()
                messages.success(request, 'Bird Updated!')
                return HttpResponseRedirect(reverse('bird_detail', args=[id]))

            except CloudinaryError as e:
                messages.add_message(
                    request, messages.ERROR,
                    f'Error uploading image: {str(e)}'
                )

        else:
            messages.error(request, 'Error updating bird!')

    else:

        edit_bird_form = AddNewBirdForm(instance=bird)

    return render(
        request,
        "bird_tracker/add_new_bird_form.html",
        {
            "view": "edit",
            "edit_bird_form": edit_bird_form,
            "id": id,
        },
    )


def bird_delete(request, id):
    """
    Bird delete View
    """
    queryset = Bird.objects.all()
    bird = get_object_or_404(queryset, id=id)
    # comment = get_object_or_404(Comment, pk=comment_id)
    bird.delete()
    messages.add_message(request, messages.SUCCESS, 'Bird deleted')

    return HttpResponseRedirect(reverse('home'))
