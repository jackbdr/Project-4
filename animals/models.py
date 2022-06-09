from django.db import models

# Create your models here.


class Animal(models.Model):
    name = models.CharField(max_length=100, default=None)
    sci_name = models.CharField(max_length=100, default=None)
    is_ancient = models.BooleanField(default=False)
    description = models.TextField(max_length=1000, default=None)
    fact = models.TextField(max_length=750, default=None)
    an_group = models.CharField(max_length=50, default=None)
    habitat = models.CharField(max_length=50, default=None)
    con_status = models.PositiveIntegerField(default=None)
    diet = models.CharField(max_length=50, default=None)
    height = models.CharField(max_length=50, default=None, null=True, blank=True)
    length = models.CharField(max_length=50, default=None, null=True, blank=True)
    life_span = models.CharField(max_length=50, default=None, null=True, blank=True)
    avg_weight = models.FloatField(default=None)
    lat = models.DecimalField(max_digits=22, decimal_places=16, default=None)
    long = models.DecimalField(max_digits=22, decimal_places=16, default=None)
    img_1 = models.CharField(max_length=500)
    img_2 = models.CharField(max_length=500)
    admin_rating = models.PositiveIntegerField(default=None)

    def __str__(self):
        return f"{self.name}"