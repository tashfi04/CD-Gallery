from django.db import models

class Inventory(models.Model):

    item_name = models.CharField(max_length=200, null=True, blank=False)#, unique=True)
    category = models.ForeignKey('categories.Category', on_delete=models.CASCADE)
    description = models.TextField(max_length=500, null=True, blank=True)
    price = models.PositiveIntegerField(null=True, blank=False)
    count = models.PositiveIntegerField(null=True, blank=False)


    def __str__(self):
        return self.item_name

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['item_name', 'category'], name='unique_customer')
        ]
