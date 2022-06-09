# from dataclasses import fields
# from rest_framework import serializers
# from django.contrib.auth import get_user_model, password_validation
# from django.contrib.auth.hashers import make_password

# from django.core.exceptions import ValidationError # error thrown if password doesn't match password_confirmation

# User = get_user_model()

# # inherit model serializer
# class UserSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True) # similar to ...
#     password_confirmation = serializers.CharField(write_only=True)

#     def validate(self, data):
#         # 1. check passwords match
#         # 2. hash password
#         # 3. add hashed password to the data to be added to the db

#         password = data.pop("password")
#         password_confirmation = data.pop("password_confirmation")

#         # check if password matches confirmation
#         if password != password_confirmation:
#             raise ValidationError({
#                 "password_confirmation": "Does not match password"
#             })
        
#         # optional (maybe not during development):
#         # if we get to this point, we can then validate the password by the default conditions
#         # try:
#         #     password_validation.validate_password(password)
#         # except ValidationError as e:
#         #     print(e)
#         #     raise ValidationError({
#         #         "password": e.messages
#         #     })

#         # password validation now passed
#         # now need to hash the password
#         data["password"] = make_password(password)

#         return data

#     class Meta:
#         model = User
#         fields = "__all__"
