#!/usr/bin/env bash

gulp sass
gulp webpack

python manage.py migrate
python manage.py collectstatic --no-input

exec "$@"
