from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied
import jwt

from datetime import datetime, timedelta # timestamps in different formats

from django.conf import settings

from animals.serializers.populated import PopulatedAnimalSerializer

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer

from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid(True)
            print("errors ->", user_to_add.errors)
            user_to_add.save()
            return Response({ "message": "Registration Successful" }, status.HTTP_202_ACCEPTED)
        except Exception as e:
            return Response({ "detail": str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)

class LoginView(APIView):

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        try:
            user_to_validate = User.objects.get(email=email)
        except User.DoesNotExist:
            raise PermissionDenied("No account found with this email")

        if not user_to_validate.check_password(password):
            raise PermissionDenied("Invalid credentials")

        dt = datetime.now() + timedelta(hours=3)

        # building token
        token = jwt.encode(
          {
              "sub": user_to_validate.id,
              "exp": int(dt.strftime("%s"))
          },
          settings.SECRET_KEY,
          algorithm="HS256"
        )

        return Response({ "message": f"Welcome back, {user_to_validate.username}", "token": token }, status.HTTP_202_ACCEPTED)

# * /users/
class UsersViewAll(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

class UsersViewOne(APIView):

    def get(self, _request, pk):
        user = User.objects.get()