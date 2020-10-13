from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index.html'),
    path('home-index', views.home_index, name='home-index'),
    path('hotel-index', views.home_index, name='hotel-index'),
    path('flight-index', views.flight_index, name='flight-index'),
    
]