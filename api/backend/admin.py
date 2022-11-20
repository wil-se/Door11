from django.contrib import admin
from .models import Post, Brand, Collection, Season, City, Venue

admin.site.register(Post)
admin.site.register(Brand)
admin.site.register(Collection)
admin.site.register(Season)
admin.site.register(City)
admin.site.register(Venue)