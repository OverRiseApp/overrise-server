# OverRise Server

Server for OverRise

This repo holds both API server and the database schema necessary to run the web app.
Thus, when deploying, there will be 2 processes(PostgreSQL and NodeJS) to start.

## Get Started

1. `git clone https://github.com/OverRiseApp/overrise-server.git`
2. `cd overrise-server`

### Prerequisite

1. `bash`
2. `docker`
3. `NodeJS`

> Currently development are setup to only work on a UNIX-like machine.  
> A pull request to make this work on Windows will be very much appreciated.  
> Otherwise, you can use [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run this project on Windows 10.  

### Environment Variables

To run the project, you'll need to specify the environment variables in an `.env` file (unless you're running with docker or others)

For development, simply copy `.env.defaults` to `.env`. This file contains the default environment that should get the project started.    
```shell
cp .env.defaults .env
```

### Running the project

#### Database
1. `yarn watch-database`

#### Server
1. `yarn`
2. `yarn dev`

## Docker

### Database
1. `docker build -t overrise/overrise-db .`
2. `docker push overrise/overrise-db`

### Server
1. `docker build -f ./src/Dockerfile -t overrise/overrise-server .`
2. `docker push overrise/overrise-server`

## Development

### Adding DB migrations

We use knex migrations that is run before the server does anything else. This can be disabled with the `RUN_DB_MIGRATION` environment variable.

To modify the database in any way, remember to:

1. Update the SQL file in `sql/` folder
2. Create and fill the migration file with `knex migrate:make <name>`
3. Add an entry for migration in `7.test_data.sql` to indicate that the migration has been ran

> Example: `INSERT INTO "knex_migrations" ("name", "batch", "migration_time") VALUES ('20181218083635_file_name.js', 1, now());
`

Simply modify the file name and you're set.

