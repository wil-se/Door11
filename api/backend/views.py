from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PostSerializer, BrandSerializer,\
CollectionSerializer, SeasonSerializer, CitySerializer,\
CountrySerializer, VenueSerializer, EventSetSerializer,\
GallerySerializer, ImageSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from rest_framework import status
from .models import Post, Brand, Collection, Season,\
City, Country, Venue, EventSet, Gallery, Image
from rest_framework.pagination import PageNumberPagination


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10
    def get_paginated_response(self, data):
        return Response({
            'page_size': self.page_size,
            'total_objects': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page_number': self.page.number,
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data,
        })

class PostView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        print(request.data)
        serializer = PostSerializer(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = Post.objects.get(id=id)
        serializer = PostSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        type = self.request.query_params.get('type', 'event').lower().capitalize()
        id = self.request.query_params.get('id', None)
        title = self.request.query_params.get('title', None)
        if not id:
            if title:
                objs = self.paginate_queryset(Post.objects.filter(type=type, title__icontains=title), request)
            else:
                objs = self.paginate_queryset(Post.objects.filter(type=type), request)
            serialized = PostSerializer(objs, many=True)
            return self.get_paginated_response(serialized.data)
        else:
            obj = Post.objects.get(id=id)
            serialized = PostSerializer(obj)
            return Response(serialized.data)
    
    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Post.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class BrandView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = BrandSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        id = self.request.query_params.get('id', None)
        obj = Brand.objects.get(id=id)
        serializer = BrandSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Brand.objects.all(), request)
                serialized = BrandSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Brand.objects.all()
                serialized = BrandSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Brand.objects.get(id=id)
            serialized = BrandSerializer(obj)
            return Response(serialized.data)
    
    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Brand.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class CollectionView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CollectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        id = self.request.query_params.get('id', None)
        obj = Collection.objects.get(id=id)
        serializer = CollectionSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Collection.objects.all(), request)
                serialized = CollectionSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Collection.objects.all()
                serialized = CollectionSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Collection.objects.get(id=id)
            serialized = CollectionSerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Collection.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class SeasonView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = SeasonSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        id = self.request.query_params.get('id', None)
        obj = Season.objects.get(id=id)
        serializer = SeasonSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Season.objects.all(), request)
                serialized = SeasonSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Season.objects.all()
                serialized = SeasonSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Season.objects.get(id=id)
            serialized = SeasonSerializer(obj)
            return Response(serialized.data)
    
    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Season.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class CityView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CitySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = City.objects.get(id=id)
        print(obj)
        serializer = CitySerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''        
        if not id:
            if paginate:
                objs = self.paginate_queryset(City.objects.all(), request)
                serialized = CitySerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = City.objects.all()
                serialized = CitySerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = City.objects.get(id=id)
            serialized = CitySerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = City.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

class CountryView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = CountrySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        id = self.request.query_params.get('id', None)
        obj = Country.objects.get(id=id)
        serializer = CountrySerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''        
        if not id:
            if paginate:
                objs = self.paginate_queryset(Country.objects.all(), request)
                serialized = CountrySerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Country.objects.all()
                serialized = CountrySerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Country.objects.get(id=id)
            serialized = CountrySerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Country.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class VenueView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = VenueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = Venue.objects.get(id=id)
        serializer = VenueSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Venue.objects.all(), request)
                serialized = VenueSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Venue.objects.all()
                serialized = VenueSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Venue.objects.get(id=id)
            serialized = VenueSerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Venue.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class EventSetView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = EventSetSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = EventSet.objects.get(id=id)
        serializer = EventSetSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(EventSet.objects.all(), request)
                serialized = EventSetSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = EventSet.objects.all()
                serialized = EventSetSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = EventSet.objects.get(id=id)
            serialized = EventSetSerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = EventSet.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class GalleryView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        serializer = GallerySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = Gallery.objects.get(id=id)
        serializer = GallerySerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Gallery.objects.all(), request)
                serialized = GallerySerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Gallery.objects.all()
                serialized = GallerySerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Gallery.objects.get(id=id)
            serialized = GallerySerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Gallery.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)


class ImageView(APIView, StandardResultsSetPagination):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        print(request.data)
        serializer = ImageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request):
        print(request.data)
        id = self.request.query_params.get('id', None)
        obj = Image.objects.get(id=id)
        serializer = ImageSerializer(obj, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        id = self.request.query_params.get('id', None)
        paginate = self.request.query_params.get('no_page', None) != ''
        if not id:
            if paginate:
                objs = self.paginate_queryset(Image.objects.all(), request)
                serialized = ImageSerializer(objs, many=True)
                return self.get_paginated_response(serialized.data)
            else:
                objs = Image.objects.all()
                serialized = ImageSerializer(objs, many=True)
                return Response(serialized.data)
        else:
            obj = Image.objects.get(id=id)
            serialized = ImageSerializer(obj)
            return Response(serialized.data)

    def delete(self, request):
        id = self.request.query_params.get('id', None)
        if not id:
            return Response(status=status.HTTP_404_NOT_FOUND)
        try:
            obj = Image.objects.get(id=id)
            obj.delete()
            return Response(status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

