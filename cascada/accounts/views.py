from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from accounts.forms import RegistrationForm,AccountAuthenticationForm


#def register_user(request):
#    if request.method == "POST":
#       form = UserCreationForm(request.POST) 
#       if form.is_valid():
#           form.save()
#           username = form.cleaned_data['username']
#           password = form.cleaned_data['password1']
#           user = authenticate(username=username, password=password)
#           login(request, user)
#           messages.success(request, ("Account Created Successfully"))
#           return redirect('home')
#    else:
#        form = UserCreationForm()
#    return render(request, 'register.html',{'form':form})
#def login_user(request):
#    if request.method == "POST":
#        username        = request.POST['usernmae']
#        password        = request.POST['password']
#        user            = authenticate(request, username=username, password=password)
#        if user is not None:
#            login(request, user)
#            #return redirect('homepage')
#        else:
#            messages.success(request,("Error logging in please try again"))
#            return redirect('login')
#    else:
#        return render(request, 'login.html',)
## or create an authenticate folder to host all thee authenticate htmls and have it point to aunthenticate/login.html decide later
#
#def logout_user(request):
#    logout(request)
#    return render('login')


#@login_required(login_url = 'login') --> make login requird to see home page, modules,editpage,etc
#def home(request):
#register
def register_view(request):
    context = {}
    if request.POST:
        form = RegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            email =form.cleaned_data.get('email').lower()
            raw_password = form.cleaned_data.get('password1')
            account = authenticate(email=email, password=raw_password)
            login(request, account)
            return redirect('home')
        else:
            context['registration_form'] = form
        
    else:
        form = RegistrationForm()
        context['registration_form'] = form
        
    return render(request, 'account/register.html', context)

#login

def login_view(request):
    context = {}
    user = request.user
    if user.is_authenticated:
        return redirect("home")
    if request.POST:
        form = AccountAuthenticationForm(request.POST)
        if form.is_valid():
            email = request.POST['email']
            password = request.POST['password']
            user = authenticate(email=email, password=password)
            
            if user:
                login(request, user)
                return redirect("home")
    else:
        form = AccountAuthenticationForm
        
    context['login_form'] = form
    
    return render(request, "account/login.html", context)

#logout
def logout_view(request):
    logout(request)
    return redirect('/') #login page maybe

def must_authenticate_view(request):
    return render(request, 'account/must_authticate.html',{})