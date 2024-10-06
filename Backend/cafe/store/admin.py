from django.contrib import admin

# Register your models here.

from .models import ItemCategory, Item
from unfold.admin import ModelAdmin
from unfold.admin import TabularInline

# admin.site.register(ItemCategory)
# admin.site.register(Item)


class ItemInline(TabularInline):
    model = Item
    extra = 0
    
class ItemCategoryAdmin(ModelAdmin):
    inlines = [ItemInline]

admin.site.register(ItemCategory, ItemCategoryAdmin)