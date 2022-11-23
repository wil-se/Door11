from django.core.management.base import BaseCommand, CommandError
from geopy import geocoders
from datetime import datetime
import pytz
from backend.models import City, Country
import time


cities = [
"Paris",
"London",
"Bangkok",
"Singapore",
"New York",
"Kuala Lumpur",
"Hong Kong",
"Dubai",
"Istanbul",
"Rome",
"Shanghai",
"Los Angeles",
"Las Vegas",
"Miami",
"Toronto",
"Barcelona",
"Dublin",
"Amsterdam",
"Moscow",
"Cairo",
"Prague",
"Vienna",
"Madrid",
"San Francisco",
"Vancouver",
"Budapest",
"Rio de Janeiro",
"Berlin",
"Tokyo",
"Mexico City",
"Buenos Aires",
"St. Petersburg",
"Seoul",
"Athens",
"Jerusalem",
"Seattle",
"Delhi",
"Sydney",
"Mumbai",
"Munich",
"Venice",
"Florence",
"Beijing",
"Cape Town",
"Washington D.C.",
"Montreal",
"Atlanta",
"Boston",
"Philadelphia",
"Chicago",
"San Diego",
"Stockholm",
"Cancún",
"Warsaw",
"Sharm el-Sheikh",
"Dallas",
"Hồ Chí Minh",
"Milan",
"Oslo",
"Libson",
"Punta Cana",
"Johannesburg",
"Antalya",
"Mecca",
"Macau",
"Pattaya",
"Guangzhou",
"Kiev",
"Shenzhen",
"Bucharest",
"Taipei",
"Orlando",
"Brussels",
"Chennai",
"Marrakesh",
"Phuket",
"Edirne",
"Bali",
"Copenhagen",
"São Paulo",
"Agra",
"Varna",
"Riyadh",
"Jakarta",
"Auckland",
"Honolulu",
"Edinburgh",
"Wellington",
"New Orleans",
"Petra",
"Melbourne",
"Luxor",
"Hà Nội",
"Manila",
"Houston",
"Phnom Penh",
"Zürich",
"Lima",
"Santiago",
"Bogotá"
]


def get_data(name):
    try:
        g = geocoders.GeoNames(username='alice')
        place, (latitude, longitude) = g.geocode(name)
        timezone = pytz.timezone(str(g.reverse_timezone((latitude, longitude))))
        parsed = [x.strip() for x in place.split(',')]

        print(parsed)
        try:
            city = parsed[0]
        except:
            return
        try:
            region = parsed[1]
        except:
            region = ''
        try:
            country = parsed[2]
        except:
            return
        try:
            dbcountry = Country.objects.get(name=country)
            print('country already contained')
        except:
            print('country not found')
            dbcountry = Country(name=country)
            dbcountry.save()
        
        try:
            dbcity = City.objects.get(name=city)
            print('city already contained')
        except:
            dbcity = City(name=city, country=dbcountry, region=region, timezone=timezone, latitude=latitude, longitude=longitude)
            dbcity.save()

        print(f'{name} OK')
    except Exception as e:
        print(e)
        time.sleep(1)
        get_data(name)


class Command(BaseCommand):
    help = 'Init countries'

    # def add_arguments(self, parser):
    #     parser.add_argument('number', nargs='+', type=int)

    def handle(self, *args, **options):
        for city in cities:
            get_data(city)
