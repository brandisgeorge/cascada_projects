from django import forms
from modules.models import plantModule

class createPlantModuleForm(forms.ModelForm):
    class Meta:
        model = plantModule
        fields = ['name', 'plants']
        
    
    
class editPlantModuleForm(forms.ModelForm):
    class Meta:
        model= plantModule
        fields = ['name','plants']
        
    def save(self, commit=True):
        plant_module = self.instance
        plant_module.name = self.cleaned_data['name']
        plant_module.plants = self.cleaned_data['body']
        
        if commit:
            plant_module.save()
        return plant_module