# Generated by Django 4.0.2 on 2022-02-07 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_remove_accounts_is_superuser_alter_accounts_email_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='accounts',
            name='is_superuser',
            field=models.BooleanField(default=False),
        ),
    ]