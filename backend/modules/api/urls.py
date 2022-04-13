from django.urls import path
from modules.api.views import (createPlant_view,detailPlant_view,showMoisture_view,listPlantModuleView)

app_name = 'modules'
urlpatterns = [
    path('createplant',createPlant_view, name = "createplant"),
   # path('deleteplant', deletePlant_view, name= "deleteplant"),
    path('detailplant', detailPlant_view, name = "detailplant"),
    #path('updateplant', updatePlant_view, name ="updateplant")
    path('plantmoisture', showMoisture_view, name= "plantmoisture"),
    path('listplant', listPlantModuleView, name= "listplant")

]