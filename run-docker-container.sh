docker rm -f overrise-db;
docker build -t overrise-db .;
docker run --rm --name overrise-db -p 5678:5432 -e POSTGRES_PASSWORD=Password overrise-db;