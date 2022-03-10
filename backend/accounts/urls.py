from django.urls import path, include
from . import views

urlpatterns = [
    path('/routes', views.getRoutes, name="routes"),
]