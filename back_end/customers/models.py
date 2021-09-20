from django.db import models

class Customer(models.Model):

    name = models.CharField(max_length=100, null=True, blank=False, unique=True)
    mobile_no = models.CharField(max_length=11, null=True, blank=False, unique=True)
    email = models.EmailField(max_length=50, null=True, blank=True, unique=True)

    def __str__(self):
        return self.name

    # class Meta:
    #     constraints = [
    #         models.UniqueConstraint(fields=['name', 'mobile_no'], name='unique_customer')
    #     ]
