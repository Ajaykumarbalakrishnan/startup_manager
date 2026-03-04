from django.contrib import admin
from .models import Project, Task, Phase, Stage

admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Phase)
admin.site.register(Stage)