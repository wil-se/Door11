from django.contrib import admin
from .models import Post, Brand, Collection, Season,\
City, Country, Venue, EventSet, Gallery, Image

admin.site.register(Post)
admin.site.register(Brand)
admin.site.register(Collection)
admin.site.register(Season)
admin.site.register(City)
admin.site.register(Country)
admin.site.register(Venue)
admin.site.register(EventSet)
admin.site.register(Gallery)
admin.site.register(Image)