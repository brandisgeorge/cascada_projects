from django.urls import path
from . import views

app_name = 'modules'
urlpatterns = [
    path('', views.moduleView, name="plant"),
]