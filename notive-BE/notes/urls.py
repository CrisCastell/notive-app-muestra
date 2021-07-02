from django.urls import path
from . import views

urlpatterns = [
    path('', views.AllNotesList.as_view(), name="notes"),
    path('note/', views.CreateNote.as_view(), name="create"),
    path('note/<int:pk>', views.NoteDetail.as_view(), name="get_note"),
    path('note/update/<int:pk>', views.NoteUpdate.as_view(), name="update_note"),


    path('categories', views.AllCategoriesList.as_view(), name="categories"),
    path('category', views.CreateCategory.as_view(), name="create-category"),

]