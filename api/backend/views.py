from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import PostSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly
from .models import Post


class PostView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def post(self, request):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def get(self, request):
        type = self.request.query_params.get('type', 'event').lower().capitalize()
        id = self.request.query_params.get('id', None)
        if not id:
            posts = Post.objects.filter(type=type)
            serialized = PostSerializer(posts, many=True)
            return Response(serialized.data)
        else:
            post = Post.objects.get(id=id)
            serialized = PostSerializer(post)
            return Response(serialized.data)