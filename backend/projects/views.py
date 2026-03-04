from rest_framework import viewsets
from .models import Project, Task, Phase, Stage
from .serializers import ProjectSerializer, TaskSerializer, PhaseSerializer, StageSerializer


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

        stage_id = self.request.query_params.get("stage")
        if stage_id:
            qs = qs.filter(stage_id=stage_id)

        phase_id = self.request.query_params.get("phase")
        if phase_id:
            qs = qs.filter(stage__phase_id=phase_id)

        return qs
    
class PhaseViewSet(viewsets.ModelViewSet):
    serializer_class = PhaseSerializer

    def get_queryset(self):
        qs = Phase.objects.all()
        project_id = self.request.query_params.get("project")
        if project_id:
            qs = qs.filter(project_id=project_id)
        return qs.order_by("order", "id")


class StageViewSet(viewsets.ModelViewSet):
    serializer_class = StageSerializer

    def get_queryset(self):
        qs = Stage.objects.all()
        phase_id = self.request.query_params.get("phase")
        if phase_id:
            qs = qs.filter(phase_id=phase_id)
        return qs.order_by("order", "id")