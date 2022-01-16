from django.urls import path
from accounts.api.views import(registration_view)
from rest_framework.authtoken.views import obtain_auth_token

app_name = "accounts"

urlpatterns = [
    path('register', registration_view, name = "register"),
    #add path('api/account/', include('account.api.urls','account_api')) to the urls.py of main app
]
