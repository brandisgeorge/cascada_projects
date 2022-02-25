from django.urls import path
from accounts.api.views import(
	registration_view,
	ObtainTokenAuthView,
	accountDetails_view,
	doesAccountExist_view,
	changePasswordView,
 	update_account_view,
)
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'

urlpatterns = [
	path('check_if_account_exists/', doesAccountExist_view, name="check_if_account_exists"),
	path('details', accountDetails_view, name="details"),
 	path('login', ObtainTokenAuthView.as_view(), name="login"), 
	path('register', registration_view, name="register"),
	path('details/update', update_account_view, name="update"),
	path('change_password/', changePasswordView.as_view,name="change_password")
]