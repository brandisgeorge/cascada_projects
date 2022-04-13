from urllib import response
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.generics import ListAPIView
from rest_framework.filters import OrderingFilter
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.serializers import Serializer
from modules.models import plantModule, plantmoisture
from accounts.models import Accounts
from modules.api.serializers import plantModuleSerializer,createplantModuleSerializer, mositureSerializer

SUCCESS = 'success'
ERROR = 'error'
DELETE_SUCCCESS = 'deleted'
UPDATE_SUCCESS = 'updated'
CREATE_SUCCESS = 'created'

@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def detailPlant_view(request):
    if request.method == 'GET':
        serializer = plantModuleSerializer(plantModule)
        return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def createPlant_view(request):
    if request.method =='POST':
        data = request.data
        serializer =createplantModuleSerializer(data=data)
        data = {}
        if serializer.is_valid():
            plant_module = serializer.save()
            data['response'] = CREATE_SUCCESS
            data['name'] = plant_module.name
            data['plants'] = plant_module.plants
            data['valve'] = plant_module.valve
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def showMoisture_view(request):
   if request.method == 'GET':
       queryset = plantmoisture.objects.all()
       read_serializer = mositureSerializer(queryset, many = True)
       return Response(read_serializer.data)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def listPlantModuleView(request):
    if request.method == 'GET':
        queryset = plantModule.objects.all()
        serializer = plantModuleSerializer(queryset, many=True)
    return Response(serializer.data)