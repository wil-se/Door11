from rest_framework import serializers
from .models import Post, Brand, Collection, Season, City, Country, Venue, EventSet



class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'

class CollectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Collection
        fields = '__all__'

class SeasonSerializer(serializers.ModelSerializer):

    class Meta:
        model = Season
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):
    country = serializers.PrimaryKeyRelatedField(queryset=Country.objects.all())

    class Meta:
        model = City
        fields = '__all__'
        depth = 1

class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = '__all__'

class VenueSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    class Meta:
        model = Venue
        fields = '__all__'
        depth = 1

class EventSetSerializer(serializers.ModelSerializer):
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())

    class Meta:
        model = EventSet
        fields = '__all__'
        depth = 1

class PostSerializer(serializers.ModelSerializer):
    brand = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Brand.objects.all())
    collection = serializers.PrimaryKeyRelatedField(queryset=Collection.objects.all())
    season = serializers.PrimaryKeyRelatedField(queryset=Season.objects.all())
    venue = serializers.PrimaryKeyRelatedField(queryset=Venue.objects.all())
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    event_set = serializers.PrimaryKeyRelatedField(queryset=EventSet.objects.all())

    class Meta:
        model = Post
        fields = '__all__'
        depth = 1

    # def create(self, validated_data):
    #     post = Post.objects.create(content=validated_data['content'])
    #     post.save()
    #     return post
