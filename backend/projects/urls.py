from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, TaskViewSet, PhaseViewSet, StageViewSet

router = DefaultRouter()
router.register(r"projects", ProjectViewSet, basename="project")
router.register(r"tasks", TaskViewSet, basename="task")
router.register(r"phases", PhaseViewSet, basename="phase")
router.register(r"stages", StageViewSet, basename="stage")

urlpatterns = router.urls