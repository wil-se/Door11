from django.db import models
from django.utils import timezone


class Post(models.Model):
    class Status(models.TextChoices):
        DRAFT = "Draft", "Draft"
        PRIVATE = "Private", "Private"
        PUBLIC = "Public", "Public"
        PASSWORD = "Password", "Password"

    class Type(models.TextChoices):
        EVENT = "Event", "Event"
        ARTICLE = "Article", "Article"

    type = models.CharField(choices=Type.choices, default=Type.EVENT, max_length=32)
    status = models.CharField(choices=Status.choices, default=Status.DRAFT, max_length=32)
    title = models.CharField(max_length=256, default='')
    date = models.DateTimeField(default=timezone.now)
    brand = models.ManyToManyField('backend.Brand')
    collection = models.ForeignKey('backend.Collection', null=True, on_delete=models.SET_NULL)
    season = models.ForeignKey('backend.Season', null=True, on_delete=models.SET_NULL)
    year = models.IntegerField(default=2000)
    city = models.ForeignKey('backend.City', null=True, on_delete=models.SET_NULL)
    venue = models.ForeignKey('backend.Venue', null=True, on_delete=models.SET_NULL)
    content = models.TextField(default='', null=True, blank=True)

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