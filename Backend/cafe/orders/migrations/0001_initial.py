# Generated by Django 5.1.1 on 2024-10-05 13:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_no', models.IntegerField()),
                ('table_status', models.CharField(max_length=20)),
                ('qr_code', models.ImageField(blank=True, upload_to='qr_codes/')),
            ],
        ),
    ]
