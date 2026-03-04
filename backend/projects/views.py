from rest_framework import viewsets
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer

    def get_queryset(self):
        qs = Project.objects.all().order_by("-created_at")

        product_id = self.request.query_params.get("product")
        if product_id:
            qs = qs.filter(product_id=product_id)

        # Optional filter: company via product -> company
        company_id = self.request.query_params.get("company")
        if company_id:
            qs = qs.filter(product__company_id=company_id)

        return qs


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer

    def get_queryset(self):
        qs = Task.objects.all().order_by("-created_at")

        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)

        return qs