from django.urls import path
from .views import PostView, BrandView, CollectionView,\
SeasonView, CityView, CountryView, VenueView, EventSetView,\
GalleryView, ImageView


urlpatterns = [
    path('post/', PostView.as_view(), name='post'),
    path('brand/', BrandView.as_view(), name='brand'),
    path('collection/', CollectionView.as_view(), name='collection'),
    path('season/', SeasonView.as_view(), name='season'),
    path('city/', CityView.as_view(), name='city'),
    path('country/', CountryView.as_view(), name='country'),
    path('venue/', VenueView.as_view(), name='venue'),
    path('eventset/', EventSetView.as_view(), name='eventset'),
    path('gallery/', GalleryView.as_view(), name='gallery'),
    path('image/', ImageView.as_view(), name='image'),
]