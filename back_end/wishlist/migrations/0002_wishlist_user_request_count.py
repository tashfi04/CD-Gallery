# Generated by Django 3.2.7 on 2021-09-16 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishlist', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wishlist',
            name='user_request_count',
            field=models.PositiveIntegerField(blank=True, null=True),
        ),
    ]