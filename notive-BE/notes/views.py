from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import NoteSerializer, CategoryListSerializer, CategoryCreateSerializer, NoteCreateSerializer, NoteUpdateSerializer
from .models import Category, Note
from accounts.models import Account
import base64
from django.core.files.base import ContentFile
import json
from django.http import JsonResponse
from rest_framework import viewsets, generics
from .permissions import IsAssigned

# Create your views here.


class AllNotesList(generics.ListAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAssigned]

    def get_queryset(self):
        queryset = Note.objects.all()
        category_query = self.request.GET.get('category', '')
        order_query    = self.request.GET.get('order', '')
        queryset = queryset.filter(author=self.request.user.id)
      
        if category_query != '' or order_query != "":
            if category_query != "":
                category = Category.objects.get(author=self.request.user.id, title=category_query)
                querysetFiltered = queryset.filter(category=category).order_by('-created_date')
            else:
                querysetFiltered = queryset.order_by('-view_count')
        else:
            querysetFiltered = queryset.order_by('-created_date')
            

        return querysetFiltered



class NoteDetail(generics.RetrieveAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [IsAssigned]

    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        obj.view_count = obj.view_count + 1
        obj.save(update_fields=("view_count", ))
        return super().retrieve(request, *args, **kwargs)


class CreateNote(generics.CreateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteCreateSerializer
    permission_classes = [IsAssigned]

class NoteUpdate(generics.UpdateAPIView):
    queryset = Note.objects.all()
    permission_classes = [IsAssigned]
    serializer_class = NoteUpdateSerializer

# @api_view(['POST'])
# @permission_classes((IsAuthenticated,))
# def createNote(request):
#     data = json.loads(request.body)
#     author          = request.user
#     image           = data['image']

#     if image:
#         format, imgstr  = image.split(';base64,')
#         ext             = format.split('/')[-1]

#         dataImg         = ContentFile(base64.b64decode(imgstr), name=f'{author.username}- casjfjsl.' + ext)
#     else:
#         dataImg = image

#     category = Category.objects.get(pk=1)

#     note = Note(author=author, image=dataImg, category=category, title=data['title'], body=data['body'])
#     note.save()
    
#     return Response({"status":"note created succesfully"})


class AllCategoriesList(generics.ListAPIView):
    serializer_class = CategoryListSerializer
    permission_classes = [IsAssigned]

    def get_queryset(self):
        queryset = Category.objects.all()
        querysetFiltered = queryset.filter(author=self.request.user.id)
        querysetFilteredAndSorted = querysetFiltered.order_by('-created_date')
        return querysetFilteredAndSorted

class CreateCategory(generics.CreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategoryCreateSerializer
    permission_classes = [IsAssigned]
