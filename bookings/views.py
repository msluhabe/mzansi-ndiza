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
from django.conf import settings
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required

# Create your views here.

def login_page(request): #login page

    request.session.pop('username', None)
    request.session.pop('password', None)

    return render(request, 'login.html')

def login_index(request): #process login

    username  = request.session.get('username')
    password  = request.session.get('password')

    if username is None: 
        username = request.POST['username']
    if password is None:
        password = request.POST['password']
    
    request.session['username'] = username
    request.session['password'] = password

    user = authenticate(request, username=username, password=password)
   
    if user is not None:
        #login(request, user)
        # Redirect to a success page.
        return redirect('/home-index')
    else:
        # Return an 'invalid login' error message.
        return redirect('/')


def index(request):
    
    username = request.session.get('username')
    password = request.session.get('password')

    user = authenticate(request, username=username, password=password)

    #if not request.user.is_authenticated:
    if user is not None:
        form_complete = False
        if request.POST.get('flights_leaving_from',False) and request.POST.get('flights_going_to',False) and request.POST.get('flights_departing_on',False) and request.POST.get('flights_arriving_on',False):
            form_complete = True

        #print("Form State")
        #print(form_complete)
        return render(request, 'index.html',{"form_state":form_complete})
    else:
        return redirect('/')
       

def hotel_index(request):
    return render(request, 'hotel-index.html')

def flight_index(request):
    
    return render(request, 'flight-index.html')

def flight_list_index(request):

    username = request.session.get('username')
    password = request.session.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:
         #Request data retrieved from ajax call

        return_flt = request.POST.get('return_flt')

        if return_flt == "true":
            return_flt = True
        else:
            return_flt = False

    
        flights_leaving_from = request.POST.get('from')
        flights_going_to = request.POST.get('to')
    
        present_date = datetime.now().date()
    
        form_outbound_date = request.POST.get('outbound_date') 
        form_outbound_date = datetime.strptime(form_outbound_date, "%m/%d/%Y").date()

        adult_pax = int(request.POST.get('adult_pax'))
        kids_pax = int(request.POST.get('kids_pax'))
        infant_pax = int(request.POST.get('infant_pax'))

        total_pax = adult_pax + kids_pax + infant_pax

        adult_chck = (adult_pax>0)
        kids_chck = (kids_pax>0)
        infant_chck = (infant_pax>0)

        outbound_flights = BookingFlights.objects.filter(orig=flights_leaving_from,dest=flights_going_to,dep_date__date=form_outbound_date).annotate(flight_hrs=ExtractHour(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())),flight_mins=ExtractMinute(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())))

        if return_flt:
            #print("Return:True)")
            form_inbound_date = request.POST.get('inbound_date')
            form_inbound_date = datetime.strptime(form_inbound_date, "%m/%d/%Y").date()
            #print(form_inbound_date)
            inbound_flights = BookingFlights.objects.filter(orig=flights_going_to,dest=flights_leaving_from,dep_date__date=form_inbound_date).annotate(flight_hrs=ExtractHour(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())),flight_mins=ExtractMinute(ExpressionWrapper(F('arr_date')-F('dep_date'),output_field=fields.DurationField())))
            #print("Outbound Flights")
            #print(outbound_flights)
            #print("Inbound Flights")
            #print(inbound_flights)
            return render(request, 'flight-list-view.html',{'flights_out': outbound_flights,'flights_in':inbound_flights, 
                                'adult_pax':adult_pax, 'kids_pax':kids_pax, 'infant_pax':infant_pax,'adult_chck':adult_chck,
                                'kids_chck':kids_chck,'infant_chck':infant_chck,'total_pax':total_pax,'return_flt':return_flt})
        else:
            #print("Outbound Flights")
            #print(outbound_flights)
            return render(request, 'flight-list-view.html',{'flights_out': outbound_flights, 'adult_pax':adult_pax, 'kids_pax':kids_pax, 'infant_pax':infant_pax,
                                'adult_chck':adult_chck,'kids_chck':kids_chck,'infant_chck':infant_chck,'total_pax':total_pax,'return_flt':return_flt})
    else:
         return render(request, 'login.html')
       

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

        adult_pax = int(request.POST.get('adults'))
        kids_pax = int(request.POST.get('kids'))
        infant_pax = int(request.POST.get('infants'))

        adult_chck = (adult_pax>0)
        kids_chck = (kids_pax>0)
        infant_chck = (infant_pax>0)

        if not (adult_chck or kids_chck or infant_chck):
            err_msgs = err_msgs + ["PN"]
        
        #print(err_msgs)
        #ser_instance = serializers.serialize('json',[err_msgs,])
        return JsonResponse({"err_msgs":err_msgs}, status=200)

    else:
        #print("JSon Not Working")
        return JsonResponse({"error":"Not Working"})

def flight_booking(request):

    return render(request, 'flight-booking.html')


def create_booking(request):

    if request.is_ajax and request.method == "POST":
        #extras = request.POST.getlist('extras[]')
        #value = 1
        #print("Extras:")
        #print(extras[0])

        bkng_id = request.POST.get('bkng_id')
        #print("bkng_id")
        #print(bkng_id)
        new_bkng = BookingFlights.objects.filter(id=bkng_id)
        new_bkng_serialized = serializers.serialize('json',new_bkng)
        #print(new_bkng)
      

        #return HttpResponse(new_bkng, content_type="text/json-comment-filtered")
        return JsonResponse({"new_bkng":new_bkng_serialized}, status=200) 
        #return HttpResponse("Success") 

    else:
        #print("JSon Not Working")
        return JsonResponse({"error":"Not Working"})

def chck_out(request):

    username = request.session.get('username')
    password = request.session.get('password')

    user = authenticate(request, username=username, password=password)

    if user is not None:

        if request.method == "POST":

            #a = request.POST.getlist('ab[]')
            #print(request.POST.get('return'))
        
            adult_pax = int(request.POST.get('adults'))
            kids_pax = int(request.POST.get('kids'))
            infant_pax = int(request.POST.get('infants'))
            urlData = request.POST.get('urlData')

            #print(urlData)

            if request.POST.get('return') == "true":
                return_f = True
            else:
                return_f = False

            pax_total = adult_pax + kids_pax + infant_pax

            #print(adult_pax)
            #print(kids_pax)
            #print(infant_pax)
            #print(return_f)

            pax_list = []

            if adult_pax > 0:
                for x in range(adult_pax):
                    i = str(x + 1)
                    pax_list.insert(len(pax_list),"Adult" + i)
        
            if kids_pax > 0:
                for x in range(kids_pax):
                    i = str(x + 1)
                    pax_list.insert(len(pax_list),"Kid" + i)

            if infant_pax > 0:
                for x in range(infant_pax):
                    i = str(x + 1)
                    pax_list.insert(len(pax_list),"Infant" + i)

            #print(pax_list)
     
            return render(request, 'flight-booking.html',{'pax_list': pax_list,'urlData':urlData,'return':return_f})
            #return HttpResponseRedirect( reverse('flight-booking') + "?" + urlData)

    else:
        #print("JSon Not Working")
        return JsonResponse({"error":"Not Working"})





