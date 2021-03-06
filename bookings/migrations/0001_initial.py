# Generated by Django 2.2.14 on 2020-11-10 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BookingFlights',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('flt_no', models.CharField(max_length=6)),
                ('orig', models.CharField(max_length=3)),
                ('dest', models.CharField(max_length=3)),
                ('dep_date', models.DateTimeField(verbose_name='dep date')),
                ('arr_date', models.DateTimeField(verbose_name='arr date')),
                ('seats_avail', models.IntegerField(default=0)),
                ('flt_price', models.IntegerField(default=0)),
                ('img', models.ImageField(upload_to='pics')),
            ],
        ),
        migrations.CreateModel(
            name='SiteImages',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_pic', models.ImageField(upload_to='')),
            ],
            options={
                'verbose_name_plural': 'BookingPics',
            },
        ),
    ]
