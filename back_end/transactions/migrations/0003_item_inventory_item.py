# Generated by Django 3.2.7 on 2021-09-17 17:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
        ('transactions', '0002_auto_20210916_1854'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='inventory_item',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='inventory.inventory'),
        ),
    ]
