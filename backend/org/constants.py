"""
Django choice constants for status fields across models in org app.
"""

COMPANY_STATUS_CHOICES = [
    ("active", "Active"),
    ("inactive", "Inactive"),
]

PRODUCT_STATUS_CHOICES = COMPANY_STATUS_CHOICES
