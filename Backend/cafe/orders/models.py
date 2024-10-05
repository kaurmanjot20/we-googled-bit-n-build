from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw

# Create your models here.

class Table(models.Model):
    table_no = models.IntegerField()
    table_status = models.BooleanField(default=False)
    qr_code = models.ImageField(upload_to='qr_codes/', blank=True)

    def __str__(self):
        return f"Table {self.table_no} - {'Occupied' if self.table_status else 'Available'}"
    
    def save(self, *args, **kwargs):
        qr_url = f"http://127.0.0.1:8000/orders/{self.table_no}/"

        qrcode_img = qrcode.make(qr_url)
        
        qr_code_size = (290, 290)
        qrcode_img = qrcode_img.resize(qr_code_size)
        
        canvas = Image.new('RGB', qr_code_size, 'white')
        
        canvas.paste(qrcode_img, (0, 0))

        fname = f'qr_code-{self.table_no}.png'
        buffer = BytesIO()
        canvas.save(buffer, 'PNG')
        buffer.seek(0)  

        self.qr_code.save(fname, File(buffer), save=False)
        buffer.close()
        
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    product = models.CharField(max_length=200)
    quantity = models.IntegerField()
    price = models.FloatField()
    total = models.FloatField(blank=True)  

    def __str__(self):
        return f"{self.product} x {self.quantity}"
    
    def save(self, *args, **kwargs):
        self.total = self.price * self.quantity
        super().save(*args, **kwargs)
        
class Order(models.Model):
    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    order_no = models.AutoField(primary_key=True)
    items = models.ManyToManyField(OrderItem)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Order for Table {self.table.table_no} on {self.created_at}"