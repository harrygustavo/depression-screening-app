#!/bin/bash

# These environment variables are consumed by the docker-compose file.
# We can supply explicit defaults that are checked in with source code 
# since they are only used for local development.

export SECRET_KEY=abc123sud
export DEBUG=True
export POSTGRES_DB=vetscreening_db
export POSTGRES_USER=harrymiranda
export POSTGRES_PASSWORD=password
export GOOGLE_API_KEY=$1
docker-compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10 
docker exec veterans_depression_screening-api-1 python /src/manage.py makemigrations 
docker exec veterans_depression_screening-api-1  python /src/manage.py migrate