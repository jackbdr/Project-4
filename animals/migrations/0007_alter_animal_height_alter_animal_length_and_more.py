# Generated by Django 4.0.5 on 2022-06-09 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('animals', '0006_animal_height_animal_length_animal_life_span'),
    ]

    operations = [
        migrations.AlterField(
            model_name='animal',
            name='height',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='animal',
            name='length',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='animal',
            name='life_span',
            field=models.CharField(default=None, max_length=50, null=True),
        ),
    ]
