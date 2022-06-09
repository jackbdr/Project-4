# Generated by Django 4.0.5 on 2022-06-08 17:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0004_remove_animal_lat'),
    ]

    operations = [
        migrations.AddField(
            model_name='animal',
            name='lat',
            field=models.DecimalField(decimal_places=16, default=None, max_digits=22),
        ),
        migrations.AlterField(
            model_name='animal',
            name='long',
            field=models.DecimalField(decimal_places=16, default=None, max_digits=22),
        ),
    ]
