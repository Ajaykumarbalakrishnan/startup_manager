from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, ProductViewSet

router = DefaultRouter()
router.register(r"companies", CompanyViewSet, basename="company")
router.register(r"products", ProductViewSet, basename="product")

urlpatterns = router.urls