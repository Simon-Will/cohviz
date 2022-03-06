# Cohviz

A dockerized web app that visualizes the cohesive structure of a text.

## How to run locally

Clone the repository to your machine.
You should have [Docker](https://docs.docker.com/engine/installation/)
and [Docker Compose](https://docs.docker.com/compose/install/) installed.
Make sure that you have ownership of all files:

Make sure you have the [Germanet files](http://www.sfs.uni-tuebingen.de/GermaNet/) and put them into
the repository root, e.g. as `GN_V110_XML`. If you have another version than 11.0, adjust the directory name in
`docker-compose.yml`.

Set your own database password by replacing `POSTGRES_PASSWORD` and `DB_PASS` in `docker-compose.yml`

Then start the app (this will take a while the first time you run it because it installs lots of dependencies):

```
docker-compose up -d
```

Set up a django super user:

```
docker exec -it cohviz_web_1 python3 manage.py createsuperuser
```

Your application should be running on `localhost:8080`. 

In order to stop the application run

```
docker-compose stop
```

In case you do not want to build the image yourself, you can also use the pre-built image
[gorgor/cohviz](https://hub.docker.com/r/gorgor/cohviz/tags) available on Docker Hub. To do so, replace the line
`build: ./web` with `image: gorgor/cohviz:0.1.0` (or a newer version tag if available).

## How to run in production

The procedure for running Cohviz in production is mostly identical to the steps
described above. You will need to adjust the environment variables
`ALLOWED_HOSTS` and `CSRF_TRUSTED_ORIGINS` to include your domain. E.g., if you
want to host the app at `cohviz.example.com`, set:

```
ALLOWED_HOSTS=localhost,cohviz.example.com
CSRF_TRUSTED_ORIGINS=http://localhost:8080,https://cohviz.example.com
```

Then you can just use another Nginx or Apache as a reverse proxy in front of the
Nginx in the `docker-compose.yml`.

## License

This project is licensed under the MIT License - see the [license](LICENSE) file for details.
