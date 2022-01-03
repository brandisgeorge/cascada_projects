from django.forms.widgets import PasswordInput
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.forms import UserCreationForm

def register_user(request):
    if request.method == "POST":
       form = UserCreationForm(request.POST) 
       if form.is_valid():
           form.save()
           username = form.cleaned_data['username']
           password = form.cleaned_data['password1']
           user = authenticate(username=username, password=password)
           login(request, user)
           messages.success(request, ("Account Created Successfully"))
           return redirect('home')
    else:
        form = UserCreationForm()
    return render(request, 'register.html',{'form':form})
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
        return render(request, 'login.html',)
# or create an authenticate folder to host all thee authenticate htmls and have it point to aunthenticate/login.html decide later

def logout_user(request):
    logout(request)
    return render('login')


#@login_required(login_url = 'login') --> make login requird to see home page, modules,editpage,etc
#def home(request):