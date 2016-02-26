# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-26 09:03
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gems', '0002_gem_rating'),
    ]

    operations = [
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now_add=True)),
                ('t_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('buyer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to=settings.AUTH_USER_MODEL)),
                ('gem', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='transactions', to='gems.Gem')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
