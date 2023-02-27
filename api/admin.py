from django.contrib import admin
from api.models import *

# Register your models here.
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
