from org.models import Product
from django.db import models
product = models.ForeignKey(Product, null=True, blank=True, on_delete=models.SET_NULL, related_name="projects")

class Project(models.Model):
    product = models.ForeignKey(
    Product,
    null=True,
    blank=True,
    on_delete=models.SET_NULL,
    related_name="projects",
)
    STATUS_CHOICES = [
        ("planned", "Planned"),
        ("active", "Active"),
        ("done", "Done"),
        ("paused", "Paused"),
    ]

    name = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="planned")
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = [
        ("todo", "To Do"),
        ("doing", "Doing"),
        ("done", "Done"),
        ("blocked", "Blocked"),
    ]

    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name="tasks")
    title = models.CharField(max_length=250)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="todo")
    due_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title