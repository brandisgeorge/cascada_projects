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
            token               = Token.objects.get(user=account).key
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
class ObtainTokenAuthView(APIView):
    
    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        context = {}
        email       = request.POST.get('username')
        password    = request.POST.get('password')
        account     = authenticate(email=email, password=password)
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            context['response']         = 'Authenticated'
            context['pk']               = account.pk
            context['email']            = email.lower()
            context['token']            = token.key
        else:
            context['response']         = 'Error'
            context['error_message']    = 'Invalid Credentials'
                
        return Response(context)
    
# check account exist
@api_view(['GET', ])
@permission_classes([])
@authentication_classes([])
def doesAccountExist_view(request):
    if request.method == 'GET':
        email = request.GET['email'].lower()
        data = {}
        try:
            account             = Account.objects.get(email=email)
            data['response']    = email
        except Account.DoesNotExist:
            data['response']    = 'Accont does not exist'
        return Response(data)
    
#account details
@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def accountDetails_view(request):
    try:
        account     = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =='GET':
        serializer = AccountSerializer(account)
        return Response(serializer.data)
    
    
#maybe add a change password view
