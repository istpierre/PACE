# PACE

A simplified project management tool that allows users to create, update, delete, and view
projects and tasks.

# Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [NodeJs](https://nodejs.org/en/download/package-manager)

# Set Up

For the backend use a docker-compose up --build to create the server and database services.

```
docker-compose up --build
```

In the client directory run a NPM install to fetch all the project dependencies.

```
npm i
```

Once the backend system is up and running you can run dev in the client folder to view the front end website.

```
npm run dev
```

NOTE: the database has a docker volume so data will persist between restarts. In order to delete all data run the following command after stopping the docker container

```
docker-compose down -v
```

A postman collection is also available for additional functionality that did not make it into the website.
