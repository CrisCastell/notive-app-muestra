import string
import random
from django.utils.text import slugify
from time import gmtime, strftime
import base64
from django.core.files.base import ContentFile

errorResponse = {
    "error": {
        "detail":"",
        "code":""
    }
}




def random_string_generator(size=10, chars=string.ascii_lowercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))

def get_time_for_title():
    time = strftime("%a%d%b%Y-%H-%M-%S", gmtime())
    return time


def convertImage(image, user):
    if image:
        format, imgstr  = image.split(';base64,')
        ext             = format.split('/')[-1]
        slug = random_string_generator()
        time = get_time_for_title()

        dataImg         = ContentFile(base64.b64decode(imgstr), name=f'{user.username}-{user.email}-{slug}-{time}.{ext}')
    else:
        dataImg = image

    return dataImg