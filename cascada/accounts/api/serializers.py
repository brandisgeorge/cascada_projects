from rest_framework import serializers
#from account.models import Account

class ResgistrationSerializer(serializers.ModelSerializer):
    #add password2 that is not in the account model
    password2           = serializers.CharField(style={'input_type': 'password'}, write_only = True)
    class Meta:
       # model           = Account
        fields          =['email', 'username', 'password', 'password2']
        #for security to hide what is being written
        extra_kwargs    = {'password': {'write_only': True}}
        
    def save(self):
        #account         = Account(
       #                             email       = self.validated_data['email'],
       #                             username    = self.validated_data['username']
        #)
        password        = self.validated_data['password']
        password2       = self.validated_data['password2']
        
        #give error statement if passwords dont match
        if password != password2:
            raise serializers.ValidationError({'password':'Passwords do not match.'})
        #account.set_password(password)
        #account.save()
        #return account