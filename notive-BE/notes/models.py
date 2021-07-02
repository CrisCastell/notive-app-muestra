from django.db import models
from accounts.models import Account

# Create your models here.

class Category(models.Model):
    author  = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="categories")
    title   = models.CharField(default="", max_length=255)
    created_date = models.DateTimeField(verbose_name='date created', auto_now_add=True, null=True)

    def __str__(self):
        return self.title

class Note(models.Model):
    author               = models.ForeignKey(Account, on_delete=models.CASCADE, related_name="notes")
    category             = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='notes', default=1)
    title                = models.CharField(null=True, max_length=255, blank=False, default='No-Title')
    body                 = models.TextField(null=True, blank=True)
    image                = models.ImageField(blank=True, null=True, upload_to='notes')
    created_date         = models.DateTimeField(verbose_name='date joined', auto_now_add=True, null=True)
    view_count           = models.IntegerField(default=0)


    def __str__(self):
        return self.title