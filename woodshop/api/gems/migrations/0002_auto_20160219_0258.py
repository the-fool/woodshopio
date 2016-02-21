# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-19 02:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('gems', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='picture',
            old_name='gem_stem',
            new_name='gem',
        ),
        migrations.AlterField(
            model_name='gem',
            name='main_picture',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='gem_asset', to='gems.Picture'),
        ),
    ]