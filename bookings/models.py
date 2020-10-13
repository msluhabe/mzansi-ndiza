from django.db import models

# Create your models here.
class SiteImages(models.Model):
    site_pic = models.ImageField()

    class Meta:
        verbose_name_plural = "BookingPics"
    
    def _str_(self):
        return self.site_pic.name