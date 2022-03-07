from django.urls import path, include
from . import views

urlpatterns = [
    path('/routes', views.getRoutes, name="routes"),
    path('auth/', include('rest_auth.urls')),    
    path('auth/register/', include('rest_auth.registration.urls'))
]