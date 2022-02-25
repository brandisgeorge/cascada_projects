from django import forms
from django.contrib.auth import authenticate
from django.contrib.auth.forms import UserCreationForm

from accounts.models import Accounts

class registrationForm(UserCreationForm):
    email = forms.EmailField(required=True, help_text = 'Add a valid email address.')
    
    class Meta:
        model = Accounts
        fields = ('username','email','password1','password2')
        
        def clean_email(self):
            email = self.cleaned_data['email']
            try:
                account = Accounts.objects.exclude(pk=self.instance.pk).get(email=email)
            except Accounts.DoesNotExist:
                return email
            raise forms.ValidationError('Email "%s" is already in use.' % account)
        
class AccountUpdateForm(forms.ModelForm):
    class Meta:
        model = Accounts
        fields = ('email', 'username')
        
    def clean_email(self):
        email = self.cleaned_data['email'].lower()
        try:
            account = Accounts.objects.exclude(pk=self.instance.pk).get(email=email)
        except Accounts.DoesNotExist:
            return email
        raise forms.ValidationError('Email "%s" is already in use.' % account)
    
    def clean_username(self):
        username = self.cleaned_data['username']
        try:
            account = Accounts.objects.exclude(pk=self.instance.pk).get(username=username)
        except Accounts.DoesNotExist:
            return username
        raise forms.ValidationError('Username "%s" is already in use.'% username)