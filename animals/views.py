# REST
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

# CUSTOM
from .models import Animal 
from .serializers.common import AnimalSerializer
from .serializers.populated import PopulatedAnimalSerializer

# permissions
from rest_framework.permissions import IsAuthenticatedOrReadOnly

# * /animals/
class AnimalListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly, ) 

    # GET all
    def get(self, _request):
        animals = Animal.objects.all() 
        # use serializer to conver to python data type
        serialized_albums = AnimalSerializer(animals, many=True)
        return Response(serialized_albums.data, status=status.HTTP_200_OK) 

    # POST one
    def post(self, request):
        deserialized_animal = AnimalSerializer(data=request.data)
        try:
            deserialized_animal.is_valid()
            deserialized_animal.save()
            return Response(deserialized_animal.data, status.HTTP_201_CREATED)
        except Exception as e:
            print(type(e))
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


# * /animals/:pk/
class AnimalDetailView(APIView):

    def get_animal(self, pk):
        try:
            return Animal.objects.get(pk=pk)
        except Animal.DoesNotExist as e:
            print(e)
            raise NotFound({ 'detail': str(e) })

    # GET one
    def get(self, _request, pk):
        animal = self.get_animal(pk)
        print('animal ->', animal)
        serialized_animal = PopulatedAnimalSerializer(animal)
        return Response(serialized_animal.data, status.HTTP_200_OK)

    # DELETE one
    def delete(self, _request, pk):
        print('PK ->', pk)
        animal_to_delete = self.get_album(pk)
        animal_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # PUT - This function will update the existing record with new data
    def put(self, request, pk):
        animal_to_update = self.get_animal(pk=pk)
        deserialized_animal = AnimalSerializer(animal_to_update, request.data)
        try:
            deserialized_animal.is_valid()
            deserialized_animal.save()
            return Response(deserialized_animal.data, status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)
