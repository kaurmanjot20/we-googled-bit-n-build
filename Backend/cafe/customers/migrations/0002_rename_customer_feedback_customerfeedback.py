# Generated by Django 5.1.1 on 2024-10-05 15:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customers', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Customer_feedback',
            new_name='CustomerFeedback',
        ),
    ]
