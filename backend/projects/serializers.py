from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["id", "product", "name", "status", "description", "created_at"]

from .models import Project, Task  # update import

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "title",
            "status",
            "due_date",
            "notes",
            "created_at",
        ]