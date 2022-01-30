from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate

from accounts.models import Account

#creating a registration form from the django user Creation form
class RegistrationForm(UserCreationForm):
    
    email = forms.EmailField(max_length = 254, help_text = 'Add a valid email address.')
    
    class Meta:
        model = Account
        fiels = '__all__'
 #make sure email is not associated with another account       
    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        try:
            account = Account.objects.exclude(pk=self.instance.pk).get(email=email)
        except Account.DoesNotExist:
            return email
        raise forms.ValidationError('Email is already in use.')
    
    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            account = Account.objects.exclude(pk=self.instance.pk).get(username=username)
        except Account.DoesNotExist:
            return username
        raise forms.ValidationError('Username already exist' % username)
  
#authenticate to login   
class AccountAuthenticationForm(forms.ModelForm):
    password = forms.CharField(label='Password', widget = forms.PasswordInput)
    
    class Meta:
        model = Account
        fields = ('email', 'password')
        
    def clean(self):
        if self.is_valid():
            email       = self.cleaned_data['email']
            password    = self.cleaned_data['password']
            if not authenticate(email=email, password=password):
                raise forms.ValidationError("Invalid login")