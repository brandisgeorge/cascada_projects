# Generated by Django 4.0.2 on 2022-04-10 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('modules', '0004_alter_plantmodule_name_alter_plantmodule_plants'),
    ]

    operations = [
        migrations.CreateModel(
            name='plantmoisture',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('moisture', models.IntegerField()),
            ],
            options={
                'db_table': 'moisture',
            },
        ),
        migrations.AlterModelOptions(
            name='plantmodule',
            options={'ordering': ['name']},
        ),
    ]
