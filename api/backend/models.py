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
    venue = models.ForeignKey('backend.Venue', null=True, on_delete=models.SET_NULL)
    content = models.TextField(default='', null=True, blank=True)
    city = models.ForeignKey('backend.City', null=True, on_delete=models.SET_NULL)
    event_set = models.ForeignKey('backend.EventSet', null=True, on_delete=models.SET_NULL)
    gallery = models.ForeignKey('backend.Gallery', null=True, on_delete=models.SET_NULL)
    to_be_announced = models.BooleanField(default=True)


    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.gallery:
            gallery = Gallery()
            gallery.save()
            self.gallery = gallery
        super(Post, self).save(*args, **kwargs)


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


class Venue(models.Model):
    city = models.ForeignKey('backend.City', null=True, on_delete=models.SET_NULL)
    name = models.CharField(max_length=128, default='')
    subvenue = models.CharField(max_length=128, default='')
    address = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name


class City(models.Model):
    name = models.CharField(max_length=128, default='')
    country = models.ForeignKey('backend.Country', null=True, on_delete=models.SET_NULL)
    region = models.CharField(max_length=64, default='')
    timezone = models.CharField(max_length=64, default='Europe/Paris')
    latitude = models.FloatField(default=-1)
    longitude = models.FloatField(default=-1)

    def __str__(self):
        return self.name


class Country(models.Model):
    name = models.CharField(max_length=128, default='')

    def __str__(self):
        return self.name


class EventSet(models.Model):
    name = models.CharField(max_length=128, default='')
    start_date = models.DateTimeField(default=timezone.now)
    end_date = models.DateTimeField(default=timezone.now)
    city = models.ForeignKey('backend.City', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name


class Gallery(models.Model):
    name = models.CharField(max_length=128, default='')
    images = models.ManyToManyField('backend.Image')

    def __str__(self):
        return self.name


class Image(models.Model):
    class Camera(models.TextChoices):
        LOOKS = "Looks", "Looks"
        CLOSEUPS = "Close-Ups", "Close-Ups"
        VIBES = "Vibes", "Vibes"
        BACKSTAGE = "Backstage", "Backstage"
        FIRSTLOOKS = "First Looks", "First Looks"
        PEOPLE = "People", "People"

    name = models.CharField(max_length=128, default='', blank=True)
    file = models.FileField(upload_to='images/', null=True)
    type = models.CharField(choices=Camera.choices, default=Camera.LOOKS, max_length=32)
    order = models.IntegerField(default=0)
    last_modified_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if self.name == '':
            self.name = self.file.name
        super(Image, self).save(*args, **kwargs)

