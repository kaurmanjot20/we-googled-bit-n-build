from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, OrderItem, Table

@receiver(post_save, sender=Order)
def delete_order_items_on_order_completion(sender, instance, **kwargs):
    if instance.is_completed:
        table = instance.table

        instance.items.clear()

        OrderItem.objects.filter(table=table).update(table=None)

        OrderItem.objects.filter(table=None).delete()
        
@receiver(post_save, sender=Order)
def update_table_status_on_order(sender, instance, created, **kwargs):
    if created:
        table = instance.table
        table.table_status = False
        table.save()