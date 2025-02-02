# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-23 20:26


from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cohapp', '0005_cognitiveloadrevision_measurement'),
    ]

    operations = [
        migrations.CreateModel(
            name='CognitiveLoadDraft',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('measurement', models.PositiveSmallIntegerField()),
                ('question1', models.PositiveSmallIntegerField()),
                ('question2', models.PositiveSmallIntegerField()),
                ('question3', models.PositiveSmallIntegerField()),
                ('question4', models.PositiveSmallIntegerField()),
                ('experiment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Experiment', verbose_name=b'Experiment')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Subject', verbose_name=b'Subject')),
            ],
        ),
    ]
