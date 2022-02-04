#!/usr/bin/env bash

mkdir -p /data/db

echo 'Starting mongod in background. Logging to mongod.log'
bash -c 'mongod 2>&1 | tee mongod.log' &

# The gulp commands are here instead of in the Dockerfile to facilitate using Docker volumes.
# If this were in the Dockerfile and the /code/static directory is mounted as a volume, the files in the volume
# will overwrite what was built in the Dockerfile. By doing it here in the entrypoint, we are overwriting the
# files in the volume.
gulp bower-files
gulp scripts-vendor
gulp sass
gulp scripts-app
gulp treatment-minify
gulp handlebars
gulp webpack

python manage.py migrate
python manage.py collectstatic --no-input

exec "$@"
