from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='login'),
    path('login-index', views.login_index, name='login-index'),
    path('home-index', views.index, name='home-index'),
    path('hotel-index', views.hotel_index, name='hotel-index'),
    path('flight-index', views.flight_index, name='flight-index'),
    path('flight-list', views.flight_list_index,  name='flight-list'),
    path('home-index/validate',views.input_validate, name='input-validate'),
    path('home-index/chck-out',views.chck_out, name='chck-out'),
    path('home-index/create-booking',views.create_booking, name='create-booking'),
    path('flight-booking',views.flight_booking, name='flight-booking'),
    
]