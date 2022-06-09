from jwt_auth.serializers.common import UserSerializer
from .common import AnimalSerializer
from comments.serializers.populated import PopulatedCommentSerializer
from jwt_auth.serializers.common import UserSerializer

class PopulatedAnimalSerializer(AnimalSerializer):
    comments = PopulatedCommentSerializer(many=True)
    added_by = UserSerializer()