# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-06 03:32
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('vendors', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='owner',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='vendor', to=settings.AUTH_USER_MODEL),
        ),
    ]