FROM postgres:11.7-alpine
COPY ./sql/ /docker-entrypoint-initdb.d/