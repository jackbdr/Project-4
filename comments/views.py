from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ValidationError, PermissionDenied
from rest_framework.permissions import IsAuthenticated

from .serializers.common import CommentSerializer
from .models import Comment

# post new comment
class CommentListView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        request.data['added_by'] = request.user.id
        print('request ->', request.data)
        comment_to_add = CommentSerializer(data=request.data)
        try:
            comment_to_add.is_valid(True)
            comment_to_add.save()
            return Response(comment_to_add.data, status.HTTP_201_CREATED)
        except ValidationError:
            return Response(comment_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
        

# Endpoint: /reviews/:id
class CommentDetailView(APIView):
    permission_classes = (IsAuthenticated, )

    def get_comment(self, pk):
        try:
            return Comment.objects.get(pk=pk)
        except Comment.DoesNotExist:
            raise NotFound("Comment not found")

    def delete(self, request, pk):
        comment_to_delete = self.get_comment(pk)
        print('request.user ->', request.user)
        if comment_to_delete.added_by != request.user:
            print('WE CANT DELETE RECORD')
            raise PermissionDenied()
        comment_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)