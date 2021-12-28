# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-22 13:26


from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Experiment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=400)),
                ('slug', models.SlugField(blank=True)),
                ('date', models.DateField(auto_now_add=True)),
                ('nr_measurements', models.PositiveSmallIntegerField(verbose_name=b'Repated Measures')),
                ('nr_groups', models.PositiveSmallIntegerField(verbose_name=b'Number of Groups')),
                ('master_pw', models.CharField(blank=True, max_length=200)),
                ('experimentator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name=b'Experiment')),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('abbreviation', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('template', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Measurement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('measure', models.PositiveSmallIntegerField()),
                ('instruction', models.TextField(blank=True)),
                ('instruction_review', models.TextField(blank=True)),
                ('publication', models.DateField()),
                ('nr_group', models.PositiveSmallIntegerField(default=1)),
                ('experiment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Experiment', verbose_name=b'Experiment')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Group', verbose_name=b'Group')),
            ],
        ),
        migrations.CreateModel(
            name='Subject',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.PositiveSmallIntegerField(blank=True)),
                ('trusted', models.BooleanField(default=False)),
                ('nr_measurements', models.PositiveSmallIntegerField(default=0, verbose_name=b'Number of Measurements')),
                ('experiment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Experiment', verbose_name=b'Experiment')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TextData',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_date', models.DateTimeField(auto_now_add=True)),
                ('pre_text', models.TextField()),
                ('post_text', models.TextField()),
                ('pre_num_sentences', models.PositiveSmallIntegerField()),
                ('post_num_sentences', models.PositiveSmallIntegerField()),
                ('pre_num_clusters', models.PositiveSmallIntegerField()),
                ('post_num_clusters', models.PositiveSmallIntegerField()),
                ('pre_num_coherent_sentences', models.PositiveSmallIntegerField()),
                ('post_num_coherent_sentences', models.PositiveSmallIntegerField()),
                ('pre_num_non_coherent_sentences', models.PositiveSmallIntegerField()),
                ('post_num_non_coherent_sentences', models.PositiveSmallIntegerField()),
                ('pre_num_concepts', models.PositiveSmallIntegerField()),
                ('post_num_concepts', models.PositiveSmallIntegerField()),
                ('pre_page_duration', models.FloatField()),
                ('post_page_duration', models.FloatField()),
                ('levenshtein_distance', models.PositiveSmallIntegerField()),
                ('experiment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Experiment', verbose_name=b'Data_Experiment_ID')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Group', verbose_name=b'Data_Group_ID')),
                ('measurement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Measurement', verbose_name=b'Data_Measurement_ID')),
                ('subject', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.Subject', verbose_name=b'Data_Subject_ID')),
            ],
        ),
    ]
