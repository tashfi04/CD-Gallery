from django.db import models

class Category(models.Model):

    name = models.CharField(max_length=100, null=True, blank=False, unique=True)

    def __str__(self):
        return self.name
