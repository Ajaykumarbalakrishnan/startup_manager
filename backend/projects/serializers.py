from rest_framework import serializers
from .models import Project, Task, Phase, Stage

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "product", "name", "status", "description", "created_at"]

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "stage",
            "title",
            "status",
            "due_date",
            "notes",
            "created_at",
        ]

class PhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phase
        fields = ["id", "project", "name", "status", "order", "created_at"]

class StageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stage
        fields = ["id", "phase", "name", "status", "order", "created_at"]