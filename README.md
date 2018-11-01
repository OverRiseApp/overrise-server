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

### Running the project

#### Database
1. `yarn watch-database`

#### Server
1. `yarn`
2. `yarn dev`

## Development 

### Database
1. `docker build -t overrise/overrise-db .`
2. `docker push overrise/overrise-db`

### Server
1. `docker build -t overrise/overrise-server .`
2. `docker push overrise/overrise-server`
