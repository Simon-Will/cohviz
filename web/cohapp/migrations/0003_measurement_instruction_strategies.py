# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-06 13:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cohapp', '0002_auto_20170404_0921'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurement',
            name='instruction_strategies',
            field=models.TextField(blank=True),
        ),
    ]