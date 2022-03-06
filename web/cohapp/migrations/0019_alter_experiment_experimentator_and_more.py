# Generated by Django 4.0 on 2021-12-30 23:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('cohapp', '0018_auto_20200507_1113'),
    ]

    operations = [
        migrations.AlterField(
            model_name='experiment',
            name='experimentator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user', verbose_name='Experiment'),
        ),
        migrations.AlterField(
            model_name='experiment',
            name='nr_groups',
            field=models.PositiveSmallIntegerField(verbose_name='Number of Groups'),
        ),
        migrations.AlterField(
            model_name='experiment',
            name='nr_measurements',
            field=models.PositiveSmallIntegerField(verbose_name='Repated Measures'),
        ),
        migrations.AlterField(
            model_name='measurement',
            name='experiment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.experiment', verbose_name='Experiment'),
        ),
        migrations.AlterField(
            model_name='measurement',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.group', verbose_name='Group'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='experiment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.experiment', verbose_name='Experiment'),
        ),
        migrations.AlterField(
            model_name='subject',
            name='nr_measurements',
            field=models.PositiveSmallIntegerField(default=0, verbose_name='Number of Measurements'),
        ),
        migrations.AlterField(
            model_name='textdata',
            name='experiment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.experiment', verbose_name='Data_Experiment_ID'),
        ),
        migrations.AlterField(
            model_name='textdata',
            name='group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.group', verbose_name='Data_Group_ID'),
        ),
        migrations.AlterField(
            model_name='textdata',
            name='measurement',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.measurement', verbose_name='Data_Measurement_ID'),
        ),
        migrations.AlterField(
            model_name='textdata',
            name='subject',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cohapp.subject', verbose_name='Data_Subject_ID'),
        ),
    ]