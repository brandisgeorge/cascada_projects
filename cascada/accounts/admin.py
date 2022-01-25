from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from accounts.models import Account

# Register your models here.
class AccountAdmin(UserAdmin):
    list_display = ('pk', 'email', 'username', 'is_admin')
    search_fields = ('pk', 'email', 'username')
    
    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()
    
admin.site.register(Account, AccountAdmin)