from django.urls import path
from .views import AnimalListView, AnimalDetailView

urlpatterns = [
    path('', AnimalListView.as_view()),
    path('<int:pk>/', AnimalDetailView.as_view())
]