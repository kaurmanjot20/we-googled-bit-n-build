from django.shortcuts import render

# Create your views here.

def order_menu(request, table_no):
    return render(request, 'orders/menu.html', {'table_no': table_no}) 