from django.urls import path

from . import views

urlpatterns = [
    path('orders/<int:table_no>/', views.order_menu, name='menu'),
]