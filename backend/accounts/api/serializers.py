from rest_framework import serializers
from accounts.models import Accounts

class registrationSerializer(serializers.ModelSerializer):
    password2       = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    
    class Meta:
        model = Accounts
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }
    def save(self):
        account = Accounts(email=self.validated_data['email'],username=self.validated_data['username'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'Passwords do not match'})
        account.set_password(password)
        account.save()
        return account
    
class accountSerializer(serializers.ModelSerializer):
    class Meta:
        mdoel = Accounts
        fields = ['pk', 'email', 'username',]
        
class changePasswordSerializer(serializers.Serializer):
    old_password            = serializers.CharField(required=True)
    new_password            = serializers.CharField(required=True)
    confrim_new_password    = serializers.CharField(required=True)
