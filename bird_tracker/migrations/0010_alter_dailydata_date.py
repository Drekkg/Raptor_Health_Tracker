# Generated by Django 4.2.14 on 2024-08-07 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bird_tracker', '0009_alter_dailydata_weight'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailydata',
            name='date',
            field=models.DateTimeField(auto_now=True, unique=True),
        ),
    ]
