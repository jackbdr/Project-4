# from rest_framework.authentication import BaseAuthentication
# from rest_framework.exceptions import PermissionDenied
# from django.contrib.auth import get_user_model
# User = get_user_model()

# # import settings
# from django.conf import settings

# # jwt
# import jwt 


# # like secure-route

# class JWTAuthentication(BaseAuthentication):

#     # authenticate method overrides the default authentication that is executed when we access any secure route
#     def authenticate(self, request):
#         # ensure authorization header exists on request
#         header = request.headers.get("Authorization")

#         # check that the header exists, if it doesn't then return None
#         if not header:
#             return None # bascially saying that authentication has failed
        
#         # check token is right format (starts with Bearer)
#         if not header.startswith("Bearer"):
#             raise PermissionDenied(detail="Auth token invalid")

#         # if we get to this point, there is a valid Bearer token
#         # now want to decode it with jwt.decode
#         token = header.replace("Bearer ", "")

#         try:
#             # attempt to decode token passed by user
#             # we need:
#               # token itself (with Bearer removed)
#               # secret
#               # algorithm
#             payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

#             user = User.objects.get(pk=payload.get("sub"))

#         # raised when the token is invalid
#         except jwt.exceptions.InvalidTokenError:
#             raise PermissionDenied(detail="Invalid token")

#         # raised when the sub from the payload didn't match a PK on the user table
#         except User.DoesNotExist:
#             raise PermissionDenied(detail="User not found")

#         # if we reach this point, user is authenticated
#         # authenticate method requires us to return a two-tuple of (user, auth)
#         # in our case user is our user variable
#         return (user, token)