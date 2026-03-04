from rest_framework import serializers
from .models import Company, Product

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ["id", "name", "status", "created_at"]

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "company", "name", "status", "created_at"]