from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Table)
admin.site.register(OrderItem)

class OrderAdmin(admin.ModelAdmin):
    list_display = ['table', 'order_no', 'is_completed', 'created_at',]
    
    

admin.site.register(Order, OrderAdmin)

