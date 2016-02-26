# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-02-26 01:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('gems', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now_add=True)),
                ('rating', models.PositiveSmallIntegerField(blank=True)),
                ('review', models.TextField(blank=True)),
                ('title', models.CharField(max_length=128, unique=True)),
                ('gem', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='review', to='gems.Gem')),
                ('reviewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='review', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
