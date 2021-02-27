from django.db import models
import math

# Create your models here.
class SiteImages(models.Model):
    site_pic = models.ImageField()

    class Meta:
        verbose_name_plural = "BookingPics"
    
    def __str__(self):
        return self.site_pic.name

class BookingFlights(models.Model):

    flt_no = models.CharField(max_length=6)
    orig = models.CharField(max_length=3)
    dest = models.CharField(max_length=3)
    dep_date = models.DateTimeField('dep date')
    arr_date = models.DateTimeField('arr date')
    seats_avail = models.IntegerField(default=0)
    flt_price = models.IntegerField(default=0)
    refundable_price = models.IntegerField(default=0)
    cancellable_price = models.IntegerField(default=0)
    changeable_price = models.IntegerField(default=0)
    extrabag_price = models.IntegerField(default=0)
    seatprior_price = models.IntegerField(default=0)

    img = models.ImageField(upload_to='pics')

    def __str__(self):
        return self.flt_no