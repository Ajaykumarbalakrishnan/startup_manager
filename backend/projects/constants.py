"""
Django choice constants for status fields across models.
These must be kept in sync with frontend constants.
"""

PROJECT_STATUS_CHOICES = [
    ("planned", "Planned"),
    ("active", "Active"),
    ("done", "Done"),
    ("paused", "Paused"),
]

TASK_STATUS_CHOICES = [
    ("todo", "To Do"),
    ("doing", "Doing"),
    ("done", "Done"),
    ("blocked", "Blocked"),
]

PHASE_STATUS_CHOICES = PROJECT_STATUS_CHOICES

STAGE_STATUS_CHOICES = PROJECT_STATUS_CHOICES

COMPANY_STATUS_CHOICES = [
    ("active", "Active"),
    ("inactive", "Inactive"),
]

PRODUCT_STATUS_CHOICES = COMPANY_STATUS_CHOICES
