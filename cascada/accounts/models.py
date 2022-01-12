from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
# Create your models here.


class Account(AbstractBaseUser):
    email               = models.EmailField(verbose_name="email", max_length=60, unique = True)
    username            = models.CharField(max_length= 30, unique = True)
    
    USERNAME_FIELD      = 'email'
    REQUIRED_FIELDS     = ['username']
    
    def __str__(self):
        return self.email