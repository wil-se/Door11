from django.core.management.base import BaseCommand, CommandError
from geopy import geocoders
from datetime import datetime
import pytz
from backend.models import Post, Brand, Season
import time
from django.db import models
import random


class Status(models.TextChoices):
    DRAFT = "Draft", "Draft"
    PRIVATE = "Private", "Private"
    PUBLIC = "Public", "Public"
    PASSWORD = "Password", "Password"


class Type(models.TextChoices):
    EVENT = "Event", "Event"
    ARTICLE = "Article", "Article"

def get_random_status():
    return random.choice(Status.choices)[0]

def get_random_brand():
    return random.choice(list(Brand.objects.all()))

def get_random_season():
    return random.choice(list(Season.objects.all()))



class Command(BaseCommand):
    help = 'Init countries'

    # def add_arguments(self, parser):
    #     parser.add_argument('number', nargs='+', type=int)

    def handle(self, *args, **options):
        print(get_random_status())
        print(get_random_brand())

        for i in range(100):
            article = Post()
            article.type = 'Article'
            article.season = get_random_season()
            article.year = random.randint(2018, 2022)
            article.content = 'content '*100
            article.save()
            brand = get_random_brand()
            article.brand.add(brand)
            article.title = f'{brand.name} {article.season} {article.year}'
            article.save()
        
        for i in range(100):
            article = Post()
            article.type = 'Event'
            article.season = get_random_season()
            article.year = random.randint(2018, 2022)
            article.content = 'content '*100
            article.save()
            brand = get_random_brand()
            article.brand.add(brand)
            article.title = f'{brand.name} {article.season} {article.year}'
            article.save()
            pass