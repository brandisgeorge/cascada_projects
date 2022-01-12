from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from accounts.api.serializers import ResgistrationSerializer, AccountSerializer
from accounts.models import Account


#user registration
@api_view(['POST',])
@permission_classes([])
@authentication_classes([])
def registration_view(request):
    if request.method == 'POST':
        data = {}
        email = request.data.get('email', '0').lower()
        if validate_email(email) != None:
            data['error_message'] = 'Email already in use.'
            data['response'] = 'Error'
            return Response(data)
        username = request.data.get('username', '0')
        if validate_username(username) != None:
            data['error_message'] = 'Username already exist.'
            data['response'] = 'Error'
            return Response(data)
        
        serializer = ResgistrationSerializer(data = request.data)

        if serializer.is_valid():
            account = serializer.save()
            data['response']    = "Account sucessfully created."
            data['email']       = account.email
            data['username']    = account.username
            data['pk']          = account.pk
            token               = Token.objects,get(user=account).key
            data['token']       = token
        else:
            data = serializer.errors
        return Response(data)
            
# create a validate_email function to make sure email is not already used
def validate_email(email):
    account = None
    try:
        account = Account.objects.get(email = email)
    except Account.DoesNotExist:
        return None
    if account !=None:
        return email
    
#create a validate_username function to make sure username is not already used
def validate_username(username):
    account = None
    try:
        account = Account.objects.get(username = username)
    except Account.DoesNotExist:
        return None
    if account != None:
        return username
    
    
#user login
