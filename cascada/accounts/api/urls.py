from django.urls import path
from accounts.api.views import(registration_view,
                               ObtainTokenAuthView,
                               accountDetails_view,
                               doesAccountExist_view,)
from rest_framework.authtoken.views import obtain_auth_token

app_name = "accounts"

urlpatterns = [
    path('register', registration_view, name = "register"),
    path('login', ObtainTokenAuthView.as_view(), name= "login"),
    path('check_account_exist/', doesAccountExist_view, name = "check_account_exist"),
    path('account_details',accountDetails_view, name= "account_details"),
    #add path('api/account/', include('account.api.urls','account_api')) to the urls.py of main app
]
