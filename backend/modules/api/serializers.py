from rest_framework import serializers
from modules.models import plantModule

class plantModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = plantModule
        fields = '__all__'