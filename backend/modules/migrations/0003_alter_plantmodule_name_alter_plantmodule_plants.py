# Generated by Django 4.0.2 on 2022-02-16 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0002_remove_plantmodule_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='plantmodule',
            name='name',
            field=models.CharField(blank=True, max_length=50),
        ),
        migrations.AlterField(
            model_name='plantmodule',
            name='plants',
            field=models.TextField(blank=True, max_length=5000, null=True),
        ),
    ]
