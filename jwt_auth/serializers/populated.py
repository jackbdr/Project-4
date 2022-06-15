from typing_extensions import Required
from .common import UserSerializer
from animals.serializers.common import AnimalSerializer
from comments.serializers.common import CommentSerializer

# class PopulatedUserSerializer(serializers.ModelSerializer):
#     animals = AnimalSerializer(many=True)
#     class Meta:
#         model = User
#         fields = '__all__'

class PopulatedUserSerializer(UserSerializer):
    animals = AnimalSerializer(many=True, required=False, allow_null=True)
    comments = CommentSerializer(many=True, required=False, allow_null=True)
