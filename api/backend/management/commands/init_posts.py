from django.core.management.base import BaseCommand, CommandError
from geopy import geocoders
from datetime import datetime
import pytz
from backend.models import Post, Brand, Season, Collection, Venue, City
import time
from django.db import models
import random



in_the_panchine_testo = """Oh, check it esclusivo
Uno sparo nel culo di chi parla di quello che scrivo
Gundeleros, we do the patto di sangue
With my man G-Mellow we still smoking piante
Get borbuka sell out from commercio
Show you talento play like suono marcio
Benetti, Noyz, Carter, Gel, Kimo, Chico
G-Mellow, Benassa The Glassa amico
TruceKlan con l'esercito affiliato
Colpo di Stato, fiamme nel commissariato
In The Panchine, baby, say what?
Sex every day, why not?
In the Audi, too fast for polizia
Show me paletta, I disappear Santa Maria
Chilling with Tarango, sto fatto al mare
Peace to Santino, (Man) che te lo dico a fare?"""


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
            article.content = in_the_panchine_testo
            article.save()
            brand = get_random_brand()
            article.brand.add(brand)
            article.title = f'{brand.name} {article.season} {article.year}'
            article.save()
            collection = Collection()
            collection.name = f'{brand.name} {article.season} {article.year} {article.season}'
            collection.save()
            article.collection = collection
            collection.save()
            venue = Venue()
            venue.city = random.choice(City.objects.all())
            venue.to_be_announced = random.choice([True, False])
            colors = ['black', 'white', 'green', 'blue', 'red']
            places = ['house', 'palace', 'attic', 'theater']
            vegetables = ['tomato', 'salad', 'carrot', 'broccoli', 'onion', 'potato']
            streets = ['street', 'road', 'venue', 'plaza']
            venue.name = f'{random.choice(colors)} {random.choice(places)}'
            venue.address = f'{random.choice(vegetables)} {random.choice(streets)}'
            venue.save()


        for i in range(100):
            article = Post()
            article.type = 'Event'
            article.season = get_random_season()
            article.year = random.randint(2018, 2022)
            article.content = in_the_panchine_testo
            article.save()
            brand = get_random_brand()
            article.brand.add(brand)
            article.title = f'{brand.name} {article.season} {article.year}'
            article.save()
            collection = random.choice(Collection.objects.all())
            collection.name = f'{brand.name} {article.season} {article.year} {article.season}'
            collection.save()
            article.collection = collection
            collection.save()
            venue = Venue()
            venue.city = random.choice(City.objects.all())
            venue.to_be_announced = random.choice([True, False])
            colors = ['black', 'white', 'green', 'blue', 'red']
            places = ['house', 'palace', 'attic', 'theater']
            vegetables = ['tomato', 'salad', 'carrot', 'broccoli', 'onion', 'potato']
            streets = ['street', 'road', 'venue', 'plaza']
            venue.name = f'{random.choice(colors)} {random.choice(places)}'
            venue.address = f'{random.choice(vegetables)} {random.choice(streets)}'
            venue.save()
            
            pass