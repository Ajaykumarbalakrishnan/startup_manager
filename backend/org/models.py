from django.db import models
from .constants import COMPANY_STATUS_CHOICES, PRODUCT_STATUS_CHOICES


class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    status = models.CharField(max_length=20, choices=COMPANY_STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("company", "name")]

    def __str__(self):
        return f"{self.company.name} / {self.name}"