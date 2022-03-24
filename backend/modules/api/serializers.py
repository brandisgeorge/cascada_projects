from rest_framework import serializers
from modules.models import plantModule

class plantModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantModule
        fields = '__all__'
        
class createplantModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantModule
        fields = '__all__'
    def save(self):
            plant_module = plantModule(name= self.validated_data["name"], plants= self.validated_data["plants"], valve= self.validated_data["valve"])
            plant_module.save()
            return plant_module
