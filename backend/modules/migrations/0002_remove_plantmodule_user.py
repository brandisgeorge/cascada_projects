# Generated by Django 4.0.2 on 2022-02-05 22:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plantmodule',
            name='user',
        ),
    ]
