# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-29 17:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gems', '0003_auto_20160227_1737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gem',
            name='main_picture',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='gem_asset', to='gems.Picture'),
        ),
    ]