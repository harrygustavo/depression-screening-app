#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.
export SECRET_KEY=abc123
export DEBUG=True
export POSTGRES_DB=vetscreening_db
export POSTGRES_USER=harrymiranda
export POSTGRES_PASSWORD=password

docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec docker-compose-veteras-depression-screening python /src/manage.py makemigrations 
docker exec docker-compose-veteras-depression-screening  python /src/manage.py migrate