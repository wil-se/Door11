from rest_framework import serializers
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = '__all__'
        depth = 1

    # def create(self, validated_data):
    #     post = Post.objects.create(content=validated_data['content'])
    #     post.save()
    #     return post