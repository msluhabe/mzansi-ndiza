from django.shortcuts import render
from django.http import HttpResponse
from bookings.models import SiteImages

# Create your views here.
def index(request):
    return render(request, 'index.html')

def home_index(request):
    return render(request, 'index.html')

def hotel_index(request):
    return render(request, 'hotel-index.html')

def flight_index(request):
    return render(request, 'flight-index.html')