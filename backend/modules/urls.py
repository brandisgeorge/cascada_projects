from django.urls import path
from  modules.api.views import views

app_name = 'modules'
urlpatterns = [
    path('', views.moduleView, name="plant"),
]