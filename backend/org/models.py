from django.db import models

# Create your models here.
from django.db import models

class Company(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
    ]

    name = models.CharField(max_length=200, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    STATUS_CHOICES = [
        ("active", "Active"),
        ("inactive", "Inactive"),
    ]

    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="products")
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="active")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("company", "name")]

    def __str__(self):
        return f"{self.company.name} / {self.name}"