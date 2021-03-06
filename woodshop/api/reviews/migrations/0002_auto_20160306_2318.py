# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-06 23:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reviews', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='review',
            name='title',
            field=models.CharField(blank=True, max_length=128, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='review',
            unique_together=set([('gem', 'author')]),
        ),
    ]
