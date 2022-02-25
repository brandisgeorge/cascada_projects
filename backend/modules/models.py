from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class plantModule(models.Model):
    
    plants = models.TextField(max_length=5000, null=True, blank=True)
   
    name = models.CharField(max_length=50, null= False, blank=True)
   
    valve = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    #orders the modules by which ones are on and off
    class Meta:
        ordering = ['valve']
#class plantModuleDetails(models.Model):