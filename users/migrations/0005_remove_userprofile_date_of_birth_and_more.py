# Generated by Django 4.2.6 on 2023-10-16 03:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_userprofile_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='date_of_birth',
        ),
        migrations.RemoveField(
            model_name='userprofile',
            name='gender',
        ),
    ]
