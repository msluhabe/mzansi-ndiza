# Generated by Django 2.2.14 on 2020-10-02 07:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='siteimages',
            options={'verbose_name_plural': 'BookingPics'},
        ),
        migrations.RenameField(
            model_name='siteimages',
            old_name='image_pic',
            new_name='site_pic',
        ),
    ]