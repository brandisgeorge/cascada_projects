from django.http import response
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.serializers import Serializer
from modules.models import plantModule
from modules.api.serializers import plantModuleSerializer


@api_view(['GET'])
def detailPlant_view(request, pk):
    plant = plantModule.objects.get(id=pk)
    serializer = plantModuleSerializer(plant, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def createPlant_view(request):
    data = request.data
    plants = plantModule.objects.create(body = data['plants'])
    serializer = plantModuleSerializer(plants, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
def updatePlant_view(request, pk):
    data = request.data
    plants = plantModule.objects.get(id=pk)
    serializer = plantModuleSerializer(instance=plants, data=data)
    
    if serializer.is_valid():
        serializer.save()
        
    return Response(serializer.data)

@api_view(['DELETE'])
def deletePlant_view(request, pk):
    plants = plantModule.objects.get(id=pk)
    plants.delete()
    return Response('Plant module was deleted successfully.')
