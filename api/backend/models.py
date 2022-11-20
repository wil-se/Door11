from django.db import models
from django.utils import timezone

POST_TYPE = (
    ('Article', 'Article'),
    ('Event', 'Event')
)

POST_STATUS = (
    ('Draft', 'Draft'),
    ('Private', 'Private'),
    ('Public', 'Public'),
    ('Password', 'Password')
)


class Post(models.Model):
    type = models.CharField(choices=POST_TYPE, default=POST_TYPE[0], max_length=32)
    status = models.CharField(choices=POST_STATUS, default=POST_STATUS[0], max_length=32)
    title = models.CharField(max_length=256, default='')
    date = models.DateTimeField(default=timezone.now)
    brand = models.ManyToManyField('backend.Brand')
    collection = models.ForeignKey('backend.Collection', null=True, on_delete=models.SET_NULL)
    season = models.ForeignKey('backend.Season', null=True, on_delete=models.SET_NULL)
    year = models.DateTimeField(default=timezone.now)
    city = models.ForeignKey('backend.City', null=True, on_delete=models.SET_NULL)
    venue = models.ForeignKey('backend.Venue', null=True, on_delete=models.SET_NULL)
    content = models.TextField(default='')

    def __str__(self):
        return self.title

class Brand(models.Model):
    name = models.CharField(max_length=64, default='')

    def __str__(self):
        return self.name

class Collection(models.Model):
    name = models.CharField(max_length=256, default='')

    def __str__(self):
        return self.name

class Season(models.Model):
    name = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name

class City(models.Model):
    name = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name

class Venue(models.Model):
    to_be_announced = models.BooleanField(default=True)
    name = models.CharField(max_length=128, default='')
    subvenue = models.CharField(max_length=128, default='')
    address = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name