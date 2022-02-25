from django.shortcuts import get_object_or_404, render, redirect
from django.http import HttpResponse
from modules.models import plantModule
from accounts.models import Accounts
from modules.forms import createPlantModuleForm, editPlantModuleForm
# Create your views here.

def createPlantModuleView(request):
    context = {}
    form = createPlantModuleForm(request.POST or None)
    if form.is_valid():
        obj = form.save(commit=False)
        obj.save()
        form = createPlantModuleForm()
    context['form'] = form
    return render(request, "modules/createplantmodule.html", context)
def detailPlantModuleView(request):
    context = {}
    plant_module = get_object_or_404(plantModule)
    context['plant_module'] = plant_module
    return render(request, 'detail.html', context)

def editPlantModuleView(request):
    context = {}
    plant_module = get_object_or_404(plantModule)
    if request.POST:
        form = editPlantModuleView(
            initial = {
                "name": plant_module.name,
                "plants": plant_module.plants,
                
            }
        )
    context['form'] = form
    return render(request,'edit.html',context)