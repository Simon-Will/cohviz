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

Setup a django super user:

```
docker exec -it cohviz_web_1 python3 manage.py createsuperuser
```

Your application should be running on `localhost:8080`. 

In order to stop the application run

```
docker-compose stop
```

## License

This project is licensed under the MIT License - see the [license](LICENSE) file for details.
