from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator
# Create your models here.


class Category(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=False)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    featured_product = models.ForeignKey(
        'Product', on_delete=models.SET_NULL, null=True, related_name='+', blank=True)

    def __str__(self) -> str:
        return self.title


class Brand(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    featured_product = models.ForeignKey(
        'Product', on_delete=models.SET_NULL, null=True, related_name='+', blank=True)

    def __str__(self) -> str:
        return self.title


class Product(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')
    brand = models.ForeignKey(Brand, on_delete=models.PROTECT)
    category = models.ForeignKey(Category, on_delete=models.PROTECT)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(
        max_digits=7, decimal_places=2, null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(
        null=True, blank=True, default=0, validators=[MaxValueValidator(5)])
    comment = models.TextField(null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)


class Order(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.SET_NULL, null=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2)
    paymentMethod = models.CharField(max_length=255, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    isDelivered = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    deliveredAt = models.DateTimeField(
        auto_now_add=False, null=True, blank=True)

    def __str__(self) -> str:
        return f'{str(self.createdAt)} at {"Deleted User" if self.user == None else self.user.username}'
    
    class Meta:
        ordering = ('-createdAt',)


class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    productName = models.CharField(max_length=255, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=1)
    price = models.DecimalField(max_digits=7, decimal_places=2)
    image = models.ImageField(null=True, blank=True,
                              default='/placeholder.png')

    def __str__(self) -> str:
        return f'Order #{self.order.id} - {self.productName}'


class ShippingAddress(models.Model):
    order = models.OneToOneField(
        Order, on_delete=models.CASCADE, null=True, blank=False, related_name='shippingAddress')
    address = models.CharField(max_length=255, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    postalCode = models.CharField(max_length=255, null=True, blank=True)
    country = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self) -> str:
        return self.address
