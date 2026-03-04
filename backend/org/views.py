from rest_framework import viewsets
from .models import Company, Product
from .serializers import CompanySerializer, ProductSerializer

class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all().order_by("name")
    serializer_class = CompanySerializer

class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.all().order_by("name")
        company_id = self.request.query_params.get("company")
        if company_id:
            qs = qs.filter(company_id=company_id)
        return qs