"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from django.contrib.auth import views as auth_views 

from accounts.views import (login_view, logout_view, register_view,)
from modules.views import (createPlantModuleView)

urlpatterns = [
    #home page
    path('', createPlantModuleView, name="plant"),
    #admin page
    path('admin/', admin.site.urls),
    #account pages
    path('login/', login_view,name="login"),
    path('logout/', logout_view, name="logout"),
    path('register/', register_view, name="register"),
    
    #api rest framework
    path('api/accounts/',include('accounts.api.urls', 'accounts_api')),
    path('api/modules/', include('modules.api.urls', 'modules_api')),
]
