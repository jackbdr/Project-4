from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, NotFound
import jwt

from datetime import datetime, timedelta  # timestamps in different formats

from django.conf import settings

from animals.serializers.populated import PopulatedAnimalSerializer

from .serializers.common import UserSerializer
from .serializers.populated import PopulatedUserSerializer
from animals.serializers.common import AnimalSerializer

from django.contrib.auth import get_user_model
User = get_user_model()
from animals.models import Animal


class RegisterView(APIView):

    def post(self, request):
        user_to_add = UserSerializer(data=request.data)
        try:
            user_to_add.is_valid(True)
            print("errors ->", user_to_add.errors)
            user_to_add.save()
            return Response({"message": "Registration Successful"}, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print({"detail": str(e)})
            return Response({"detail": str(e)}, status.HTTP_422_UNPROCESSABLE_ENTITY)


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

        return Response({"message": f"Welcome back, {user_to_validate.username}", "token": token}, status.HTTP_202_ACCEPTED)

# * /users/


class UsersViewAll(APIView):

    def get(self, _request):
        users = User.objects.all()
        serialized_users = PopulatedUserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)

# * /users/id


class UsersViewOne(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    def get(self, _request, pk):
        user = self.get_user(pk)
        serialized_user = PopulatedUserSerializer(user)
        return Response(serialized_user.data, status=status.HTTP_200_OK)

# * /favourites/userId


class FavouritesView(APIView):

    def get_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist as e:
            print(e)
            raise NotFound({'detail': str(e)})

    def post(self, request, pk):
        user = self.get_user(pk)
        serialized_user = UserSerializer(user)
        id_of_favourite = request.data['animal_id']
        animal = Animal.objects.get(pk=id_of_favourite)
        serialized_animal = AnimalSerializer(animal)
        serialized_animal["favourited_by"]
        print("FAVOURITED_BY", serialized_animal['favourited_by'])
        return Response(status=status.HTTP_200_OK)
