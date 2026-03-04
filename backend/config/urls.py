from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),

    # APIs
    path("api/", include("org.urls")),
    path("api/", include("projects.urls")),
]