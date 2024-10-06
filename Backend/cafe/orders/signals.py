from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Order, OrderItem, Table

@receiver(post_save, sender=Order)
def delete_order_items_on_order_completion(sender, instance, **kwargs):
    if instance.is_completed:
        # Get the table associated with the completed order
        table = instance.table

        # Nullify the foreign key reference before deleting items
        OrderItem.objects.filter(table=table).update(table=None)

        # Now delete all the OrderItems related to this table
        OrderItem.objects.filter(table=None).delete()

        # Clear the many-to-many relationship for items in the order
        instance.items.clear()
        
# Signal to set the table_status to False when an order is created
@receiver(post_save, sender=Order)
def update_table_status_on_order(sender, instance, created, **kwargs):
    if created:
        table = instance.table
        table.table_status = False  # Set table status to 'Occupied'
        table.save()