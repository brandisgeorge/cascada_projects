from django.urls import path
from modules.api.views import (createPlant_view,detailPlant_view)

app_name = 'modules'
urlpatterns = [
    path('createplant',createPlant_view, name = "createplant"),
   # path('deleteplant', deletePlant_view, name= "deleteplant"),
    path('detailplant', detailPlant_view, name = "detailplant"),
    #path('updateplant', updatePlant_view, name ="updateplant")
]