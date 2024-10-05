from django.db import models

# Create your models here.
from orders.models import OrderItem, Order

class Customer(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=10, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class CustomerOrder(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order = models.OneToOneField(Order, on_delete=models.SET_NULL, null=True)
    total = models.FloatField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order for {self.customer.name} on {self.created_at}"
    
    def save(self, *args, **kwargs):
        items = self.order.items.all()
        self.total = sum([item.total for item in items])
        super().save(*args, **kwargs)
    
class CustomerFeedback(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    feedback = models.TextField()
    order = models.ForeignKey(CustomerOrder, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Feedback from {self.customer.name} on {self.created_at}"