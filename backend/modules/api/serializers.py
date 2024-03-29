from rest_framework import serializers
from modules.models import plantModule
from django.db import connections
from django.db import models
from modules.models import plantmoisture

class plantModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantModule
        fields = ['name', 'plants', 'valve',]

        
class createplantModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantModule
        fields = '__all__'
    def save(self):
            plant_module = plantModule(name= self.validated_data["name"], plants= self.validated_data["plants"], valve= self.validated_data["valve"])
            plant_module.save()
            return plant_module

class moistureSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantmoisture
        fields = ['id', 'moisture']
        extra_kwargs = {'id': {'required': False}}