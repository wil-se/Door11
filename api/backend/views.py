from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PostSerializer, BrandSerializer, CollectionSerializer, SeasonSerializer, CitySerializer, VenueSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import Post, Brand, Collection, Season, City, Venue


class PostView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        id = self.request.query_params.get('id', None)
        obj = Post.objects.get(id=id)
        print(request.data)
        serializer = PostSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    
    def get(self, request):
        type = self.request.query_params.get('type', 'event').lower().capitalize()
        id = self.request.query_params.get('id', None)
        if not id:
            objs = Post.objects.filter(type=type)
            serialized = PostSerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = Post.objects.get(id=id)
            serialized = PostSerializer(obj)
            return Response(serialized.data)

class BrandView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = BrandSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            objs = Brand.objects.all()
            serialized = BrandSerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = Brand.objects.get(id=id)
            serialized = BrandSerializer(obj)
            return Response(serialized.data)


class CollectionView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CollectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            objs = Collection.objects.all()
            serialized = CollectionSerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = Collection.objects.get(id=id)
            serialized = CollectionSerializer(obj)
            return Response(serialized.data)


class SeasonView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = SeasonSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            objs = Season.objects.all()
            serialized = SeasonSerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = Season.objects.get(id=id)
            serialized = SeasonSerializer(obj)
            return Response(serialized.data)


class CityView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            objs = City.objects.all()
            serialized = CitySerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = City.objects.get(id=id)
            serialized = CitySerializer(obj)
            return Response(serialized.data)


class VenueView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = VenueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            objs = Venue.objects.all()
            serialized = VenueSerializer(objs, many=True)
            return Response(serialized.data)
        else:
            obj = Venue.objects.get(id=id)
            serialized = VenueSerializer(obj)
            return Response(serialized.data)

