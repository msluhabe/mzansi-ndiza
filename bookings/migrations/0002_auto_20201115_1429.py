# Generated by Django 2.2.14 on 2020-11-15 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bookingflights',
            name='cancellable_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='bookingflights',
            name='changeable_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='bookingflights',
            name='extrabag_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='bookingflights',
            name='refundable_price',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='bookingflights',
            name='seatprior_price',
            field=models.IntegerField(default=0),
        ),
    ]
