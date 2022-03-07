from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from django.contrib.auth import authenticate
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from accounts.api.serializers import registrationSerializer, accountSerializer, changePasswordSerializer
from accounts.models import Accounts


#user registration
#url: /api/accounts/register
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
        
        serializer = registrationSerializer(data = request.data)

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
        account = Accounts.objects.get(email = email)
    except Accounts.DoesNotExist:
        return None
    if account !=None:
        return email
    
#create a validate_username function to make sure username is not already used
def validate_username(username):
    account = None
    try:
        account = Accounts.objects.get(username = username)
    except Accounts.DoesNotExist:
        return None
    if account != None:
        return username
    
#account details
#url: /api/accounts
@api_view(['GET', ])
@permission_classes((IsAuthenticated, ))
def accountDetails_view(request):
    try:
        account     = request.user
    except Accounts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method =='GET':
        serializer = accountSerializer(account)
        return Response(serializer.data)
#account update
#url: /api/accounts/details/update 
@api_view(['PUT',])
@permission_classes((IsAuthenticated, ))    
def update_account_view(request):
    try:
        account = request.user
    except Accounts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = accountSerializer(account, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = 'Account updated Successfully'
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)          
#user login
#url: /api/accounts/login
class ObtainTokenAuthView(APIView):
    
    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        context = {}
        email       = request.POST.get('email')
        password    = request.POST.get('password')
        account     = authenticate(email=email, password=password)
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
            context['response']         = 'Authenticated Successfully'
            context['pk']               = account.pk
            context['email']            = email.lower()
            context['token']            = token
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
            account             = Accounts.objects.get(email=email)
            data['response']    = email
        except Accounts.DoesNotExist:
            data['response']    = 'Account does not exist'
        return Response(data)
    


    
class changePasswordView(UpdateAPIView):
    serializer_class =changePasswordSerializer
    model = Accounts
    permission_classes= (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)
    
    def get_objecte(self,queryset=None):
        obj = self.request.user
        return obj
    def update(self,request,*args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ['Wrong password']}, status=status.HTTP_400_BAD_REQUEST)
            
            new_password = serializer.data.get("new_password")
            confirm_new_password = serializer.data.get("confirm_new_password")
            if new_password != confirm_new_password:
                return Response({"new_password": ["New passwords must match"]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"response":"successfully changed password"}, status= status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)