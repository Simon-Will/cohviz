# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-11-24 16:08


from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cohapp', '0012_auto_20171013_1521'),
    ]

    operations = [
        migrations.AddField(
            model_name='textdata',
            name='accuracy_draft_global',
            field=models.PositiveSmallIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='textdata',
            name='accuracy_draft_local',
            field=models.PositiveSmallIntegerField(default=0),
        ),
    ]
