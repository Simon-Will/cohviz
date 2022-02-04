from django.conf import settings
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from django.db import migrations

GROUP_NAMES = [
    "integrated",
    "control-group",
    "cmap",
    "cmap-integrated",
    "segmented",
    "massed",
    "control-segmented-massed",
]


def create_default_groups(apps, schema_editor):
    Group = apps.get_model("cohapp", "Group")
    for name in GROUP_NAMES:
        group, created = Group.objects.get_or_create(name=name)
        if created:
            group.abbreviation = name
            group.description = name
            group.save()


def delete_default_groups(apps, schema_editor):
    Group = apps.get_model("cohapp", "Group")
    Group.objects.filter(name__in=GROUP_NAMES).delete()


class Migration(migrations.Migration):
    dependencies = [("cohapp", "0019_alter_experiment_experimentator_and_more")]

    operations = [migrations.RunPython(create_default_groups, delete_default_groups)]
