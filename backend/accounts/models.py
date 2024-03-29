from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token    
class AccountsManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            raise ValueError('Must have an email address')
        if not username:
            raise ValueError('Users must have a username')
        user = self.model(email=self.normalize_email(email), username=username,)
        user.set_password(password)
        user.save(using=self._db)
        return user
    def create_superuser(self,email, username, password):
        user = self.create_user(email=self.normalize_email(email),password=password,username=username)
        user.is_superuser = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user
   
class Accounts(AbstractBaseUser):
    email           =models.EmailField(verbose_name="email address", max_length=255, unique=True)
    username        =models.CharField(max_length=30,unique=True, default = 'username')
    is_staff        =models.BooleanField(default=False)
    is_active       =models.BooleanField(default=True)
    is_admin        =models.BooleanField(default=False)
    is_superuser    =models.BooleanField(default=False)
     
    USERNAME_FIELD  = 'email'
    REQUIRED_FIELDS = ['username'] #email and password required by default
    
    objects = AccountsManager()  
    def __str__(self):
        return self.email
    
    def has_perm(self, perm,obj=None):
        return self.is_admin
    def has_module_perms(self,app_label):
        return True  
    
       
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
