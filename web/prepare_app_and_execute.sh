#!/usr/bin/env bash

mkdir -p /data/db

echo 'Starting mongod in background. Logging to mongod.log'
bash -c 'mongod 2>&1 | tee mongod.log' &

gulp sass
gulp webpack

python manage.py migrate
python manage.py collectstatic --no-input

exec "$@"
