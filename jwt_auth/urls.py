from django.urls import path
from .views import RegisterView, LoginView, UsersViewAll, UsersViewOne, FavouritesView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()), 
    path('users/', UsersViewAll.as_view()),
    path('users/<int:pk>/', UsersViewOne.as_view()),
    path('favourites/<int:pk>/', FavouritesView.as_view())
]