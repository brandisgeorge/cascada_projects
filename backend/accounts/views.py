from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from accounts.forms import registrationForm
from modules.models import plantModule
from django.http import JsonResponse
from django.contrib import messages

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from accounts.forms import registrationForm
from django.contrib.auth.forms import AuthenticationForm
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt 

#register
def register_view(request):
    context = {}
    if request.POST:
        form = registrationForm(request.POST)
        if form.is_valid():
            form.save()
            email = form.cleaned_data.get('email').lower()
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            messages.success(request, "Registration success")
            return redirect('plant')
        else:
            messages.error(request, "Unsuccessful registration. Invalid Information")
            context['registration_form'] = form
        
    else:
        form = registrationForm()
        context['registration_form'] = form
    return render(request, 'accounts/register.html', context)
#logout
def logout_view(request):
    logout(request)
    messages.info(request,"You have successfully logged out.")
    return redirect("login") #login page maybe

#login
def login_view(request):
    context = {}
    user = request.user
    if user.is_authenticated:
        return redirect('accounts/account.html') #or home
    if request.POST:
        form = AuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email,password=password)
            if user:
                login(request,user)
                messages.info(request, "You are now logged in as {username}.")
                return render('accounts/account.html')
            else:
                messages.error(request, "Invalid email or password.")
        else:
            messages.error(request, "Invalid username or password")
    else:
        form = AuthenticationForm()
        return render(request=request, template_name="accounts/login.html", context={"login_form":form})
    
    




