#from multiprocessing.sharedctypes import Value
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
# Create your models here.


class AccountManager(BaseUserManager):
    def create_user(self,email, username, password=None):
        if not email:
            raise ValueError('Must have an email address')
        if not username:
            raise ValueError('Must have a username')
        
        user = self.model(
            email = self.normalize_emaile(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, username, password):
        user = self.create_user(
            email = self.normalize_email(email),
            password=password,
            username=username,
        )
        user.is_admin = True
        user.is_superuseser = True
        user.save(using = self._db)
        return user
    
    
class Account(AbstractBaseUser):
    email               = models.EmailField(verbose_name="email", max_length=60, unique = True)
    username            = models.CharField(max_length= 30, unique = True)
    is_admin            = models.BooleanField(default=False)
    is_superuser        = models.BooleanField(default=False)
    
    USERNAME_FIELD      = 'email'
    REQUIRED_FIELDS     = ['username']
    
    objects = AccountManager()
    
    def __str__(self):
        return self.email
    def has_perm(self, perm, obj=None):
        return self.is_admin
    def has_module_perms(self, app_label):
        return True
    
@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)