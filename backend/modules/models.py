from django.db import models
from django.contrib.auth.models import User
from django.db import connections
from django.db import models
# Create your models here.
class plantModule(models.Model):
    
    plants = models.TextField(max_length=5000, null=False, blank=True)
   
    name = models.CharField(max_length=50, null= False)
   
    valve = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    #orders the modules by which ones are on and off
    class Meta:
        ordering = ['name']
#class plantModuleDetails(models.Model):

class plantmoisture(models.Model):
    id = models.AutoField(primary_key = True)
    moisture = models.IntegerField()
    
    class Meta:
        db_table = "moisture"
        
        def __str__(self):
            return self.moisture