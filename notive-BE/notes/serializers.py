from rest_framework import serializers
from .models import Category, Note
from accounts.models import Account
from myplatform.utils import errorResponse, random_string_generator, get_time_for_title, convertImage


class NoteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = [ 'id', 'title', 'body', 'category', 'image']


class NoteUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = [ 'title', 'body', 'category']


class NoteCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Note
        fields = [ 'id', 'title', 'body', 'category']

    def validate_category(self, value):
        user = self.context['request'].user

        if Category.objects.filter(id=value.id, author=user).exists():
            return value
        else:
            errorResponse['error']['detail'] = "This category does not exist."
            errorResponse['error']['code'] = "errorCategory"
            raise serializers.ValidationError(errorResponse)
            # raise serializers.ValidationError({"message": "This title is already in use."})


    def save(self):
        user = self.context['request'].user
        image = self.context['request'].data['image']

        dataImg = convertImage(image, user)

        # if image:
        #     format, imgstr  = image.split(';base64,')
        #     ext             = format.split('/')[-1]
        #     slug = random_string_generator()
        #     time = get_time_for_title()

        #     dataImg         = ContentFile(base64.b64decode(imgstr), name=f'{user.username}-{user.email}-{slug}-{time}.{ext}')
            
        # else:
        #     dataImg = image

        note = Note(
            title=self.validated_data['title'],
            body=self.validated_data['body'],
            author=user,
            category=self.validated_data['category'],
            image=dataImg
        )

        print(note)

        note.save()

    #     return note

class CategoryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = [ 'id', 'title']


class CategoryCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['title']

    def validate_title(self, value):
        user = self.context['request'].user
        if Category.objects.filter(author=user, title=value).exists():
            errorResponse['error']['detail'] = "This title is already in use."
            errorResponse['error']['code'] = "errorTitle"
            raise serializers.ValidationError(errorResponse)
            # raise serializers.ValidationError({"message": "This title is already in use."})

        return value

    def create(self, validated_data):
        user = self.context['request'].user
        category = Category.objects.create(
            author=user,
            title=validated_data['title'],
        )

        category.save()

        return category