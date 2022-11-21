from rest_framework import serializers
from .models import Post, Brand, Collection, Season, City, Venue



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

    class Meta:
        model = City
        fields = '__all__'

class VenueSerializer(serializers.ModelSerializer):

    class Meta:
        model = Venue
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    brand = serializers.PrimaryKeyRelatedField(many=True, read_only=False, queryset=Brand.objects.all())
    collection = serializers.PrimaryKeyRelatedField(queryset=Collection.objects.all())
    season = serializers.PrimaryKeyRelatedField(queryset=Season.objects.all())
    city = serializers.PrimaryKeyRelatedField(queryset=City.objects.all())
    venue = serializers.PrimaryKeyRelatedField(queryset=Venue.objects.all())

    class Meta:
        model = Post
        fields = '__all__'
        depth = 1

    # def create(self, validated_data):
    #     post = Post.objects.create(content=validated_data['content'])
    #     post.save()
    #     return post
