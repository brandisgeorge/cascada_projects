from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from accounts.api.serializers import ResgistrationSerializer

@api_view(['POST',])
def registration_view(request):
    if request.method == 'POST':
        serializer = ResgistrationSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response']    = "New user sucessfully created."
            data['email']       = account.email
            data['username']    = account.username
        else:
            data = serializer.errors
        return Response(data)
            