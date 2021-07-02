from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework import generics
from .serializers import RegistrationSerializer, AccountSerializer, AccountImageSerializer, ChangePasswordSerializer, AccountBasicInfoSerializer
from .models import Account
from .permissions import IsAssigned
from django.core.files.base import ContentFile
import base64
from myplatform.utils import convertImage
from django.conf import settings

# Create your views here.

class RegisterView(generics.CreateAPIView):
    queryset = Account.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegistrationSerializer


class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAssigned]

class ChangePasswordView(generics.UpdateAPIView):
    queryset = Account.objects.all()
    permission_classes = [IsAssigned]
    serializer_class = ChangePasswordSerializer

# class ChangePasswordView(generics.UpdateAPIView):
#     queryset = Account.objects.all()
#     permission_classes = [IsAssigned]
#     serializer_class = ChangePasswordSerializer

@api_view(['GET'])
def getUserID(request):
    return Response({"id":request.user.id})

class AccountBasicInfo(generics.RetrieveAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountBasicInfoSerializer
    permission_classes = [IsAssigned]

    def get_object(self):
        user = self.request.user
        return user

class AccountImage(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountImageSerializer
    permission_classes = [IsAssigned]