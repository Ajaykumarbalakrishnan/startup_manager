from org.models import Product
from django.db import models
from .constants import (
    PROJECT_STATUS_CHOICES,
    TASK_STATUS_CHOICES,
    PHASE_STATUS_CHOICES,
    STAGE_STATUS_CHOICES,
)


class Project(models.Model):
    product = models.ForeignKey(
        Product,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="projects",
    )

    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=PROJECT_STATUS_CHOICES, default="planned")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=250)
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default="todo")
    due_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    stage = models.ForeignKey(
        "Stage",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="tasks",
    )

    def __str__(self):
        return self.title


class Phase(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="phases")
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=PHASE_STATUS_CHOICES, default="planned")
    order = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("project", "name")]
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.name} / {self.name}"


class Stage(models.Model):
    phase = models.ForeignKey(Phase, on_delete=models.CASCADE, related_name="stages")
    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STAGE_STATUS_CHOICES, default="planned")
    order = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [("phase", "name")]
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.phase.name} / {self.name}"