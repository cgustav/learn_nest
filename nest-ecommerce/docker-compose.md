# Docker Compose

### version

Is a version of docker-compose file format, you can change to the latest version

### database

On line 3 is just a service name, you can change the name whatever you want

### image

Must be mongo, because you want to create a container from mongo image.

### container_name

Is a name for your container, it’s optional.

### environment

Is a variables that will be used on the mongo container:

- `MONGO_INITDB_DATABASE` you fill with a database name that you want to create, make it same like init-mongo.js
- `MONGO_INITDB_ROOT_USERNAME` you fill with username of root that you want
- `MONGO_INITDB_ROOT_PASSWORD` you fill with password of root that you want

### volumes

To define a file/folder that you want to use for the container.

- `./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo-js:ro` means you want to copy init-mongo.js to `/docker-entrypoint-initdb.d/` as a read only file. `/docker-entrypoint-initdb.d` is a folder that already created inside the mongo container used for initiating database, so we copy our script to that folder.

* `./mongo-volume:/data/db` means you want to set data on container persist on your local folder named mongo-volume . `/data/db/` is a folder that already created inside the mongo container.

### ports

is to define which ports you want to expose and define, in this case I use default mongoDB port `27017` until `27019`

## Execution

Now run the docker-compose file with `docker-compose up` or `docker-compose up -d` to run containers in the background
Open another terminal to login to the container. Type \$ docker container ls to see our running container.

Login to your container by using container names.

`docker exec -it <container-name> bash`

## MongoURI

`mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database-name`

## Resources

- [Medium Post](https://medium.com/faun/managing-mongodb-on-docker-with-docker-compose-26bf8a0bbae3)
- [Dedicated Blog Post](https://zgadzaj.com/development/docker/docker-compose/containers/mongodb)
- [Mongo Conf File](https://docs.mongodb.com/manual/reference/configuration-options/#file-format)
- [StackOverflow Post](https://stackoverflow.com/questions/42912755/how-to-create-a-db-for-mongodb-container-on-start-up)
