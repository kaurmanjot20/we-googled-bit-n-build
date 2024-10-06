from django.db import models

# Create your models here.
from orders.models import OrderItem, Order
from django.utils import timezone
from django.utils.timezone import localtime
import datetime

class Customer(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return self.name
    
class CustomerOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True)
    total = models.FloatField(blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        local_timestamp = localtime(self.created_at)
        created_at = local_timestamp.strftime("%Y-%m-%d %H:%M:%S %Z")
        return f"Order for {self.customer.name} on {created_at}"
    
    def save(self, *args, **kwargs):
        if not self.total and self.order:
            items = self.order.items.all()
            self.total = sum(item.total for item in items)
        super().save(*args, **kwargs)

    
class CustomerFeedback(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    feedback = models.TextField()
    order = models.ForeignKey(CustomerOrder, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=timezone.now)
        
    def __str__(self):
        local_timestamp = localtime(self.created_at)
        created_at = local_timestamp.strftime("%Y-%m-%d %H:%M:%S %Z")
        return f"Feedback from {self.customer.name} on {created_at}"