from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from bookings.models import SiteImages
from bookings.models import BookingFlights
from datetime import datetime
from django.db.models import F, ExpressionWrapper, fields 
from django.db.models.functions import (ExtractDay, ExtractMonth, ExtractQuarter, ExtractWeek,ExtractWeekDay, ExtractIsoYear, ExtractYear,ExtractHour,ExtractMinute) 
import math
from django.contrib import messages
from django.http import JsonResponse
from django.core import serializers
from django.shortcuts import redirect



# Create your views here.
def index(request):
    form_complete = False
    if request.POST.get('flights_leaving_from',False) and request.POST.get('flights_going_to',False) and request.POST.get('flights_departing_on',False) and request.POST.get('flights_arriving_on',False):
        form_complete = True

    print("Form State")
    print(form_complete)
    return render(request, 'index.html',{"form_state":form_complete})

def hotel_index(request):
    return render(request, 'hotel-index.html')

def flight_index(request):
    return render(request, 'flight-index.html')

def flight_list_index(request):
    print("Test")
    print(request.POST['from'])
    flights_leaving_from = request.POST.get('from')
    flights_going_to = request.POST.get('to')
    present_date = datetime.now().date()
    form_dep_date = request.POST.get('from_date')
    flights_departing_on = datetime.strptime(form_dep_date, "%m/%d/%Y").date()
    form_arr_date = request.POST.get('to_date')
    flights_arriving_on = datetime.strptime(form_arr_date, "%m/%d/%Y").date()  
    flights = BookingFlights.objects.filter(orig=flights_leaving_from,dest=flights_going_to,dep_date__date=flights_departing_on,arr_date__date=flights_arriving_on).annotate(flight_hrs=ExtractHour(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())),flight_mins=ExtractMinute(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())))
    print(flights)
    return render(request, 'flight-list-view.html',{'flights': flights})

def input_validate(request):

    if request.is_ajax and request.method == "POST":
      
        err_msgs = []
        if not request.POST['flights_leaving_from']:
            err_msgs = ["O"] #align to where column (Missing Origin)
        if not request.POST['flights_going_to']:
            err_msgs = err_msgs + ["D"] #align to where column (Missing Destination)
        if not request.POST.get('flights_departing_on'):
            err_msgs = err_msgs + ["DD"] #align to when column (Missing Departure Date)
        if not request.POST.get('flights_arriving_on'):
            err_msgs = err_msgs + ["AD"] #align to when column (Missing Arrival Date)
        
        #ser_instance = serializers.serialize('json',[err_msgs,])
        return JsonResponse({"err_msgs":err_msgs}, status=200)

    else:
        return JsonResponse({"error":"Not Working"})





