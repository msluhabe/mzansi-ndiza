from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='home-index'),
    path('hotel-index', views.hotel_index, name='hotel-index'),
    path('flight-index', views.flight_index, name='flight-index'),
    path('flight-list', views.flight_list_index,  name='flight-list'),
    path('home-index/validate',views.input_validate, name='input-validate'),
    
]