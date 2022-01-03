from django.forms.widgets import PasswordInput
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages

def login_user(request):
    if request.method == "POST":
        username        = request.POST['usernmae']
        password        = request.POST['password']
        user            = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            #return redirect('homepage')
        else:
            messages.success(request,("Error logging in please try again"))
            return redirect('login')
    else:
        return render(request, 'login.html')
# or create an authenticate folder to host all thee authenticate htmls and have it point to aunthenticate/login.html decide later

