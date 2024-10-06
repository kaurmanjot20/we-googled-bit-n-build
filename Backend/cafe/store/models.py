from django.db import models

# Create your models here.

class ItemCategory(models.Model):
    category = models.CharField(max_length=200)

    def __str__(self):
        return self.category

class Item(models.Model):
    category = models.ForeignKey(ItemCategory, on_delete=models.CASCADE)
    product = models.CharField(max_length=200)
    price = models.FloatField()

    def __str__(self):
        return f"{self.product}"
    