# D&DRM

Dungeons & Dragons Remote Management of character sheets, combat, and more. Built using a React front end and Express back end with Socket.io, Knex, and PostgreSQL.


## Database

With postgres installed and running, you can create the user and databases for dev and tests with a shell script:

```sh
$ sh bin/create-db.sh
```

The `package.json` file contains numerous scripts for using Knex to interact with the database:

```sh
# Run the migrations to get the latest schema, or undo the latest migration
$ yarn db:migrate
$ yarn db:rollback

# Insert data into tables for development
$ yarn db:seed
$ yarn db:seed characters

# Create a new migration or seed file
$ yarn mk:migration name-of-migration
$ yarn mk:seed name-of-seed
```


## Development

Once the local database is created and configured, you can use `package.json` scripts to run the app locally for development:

```sh
# Run the Express API, restarting on file changes
# This needs to be running to respond to requests from the client
$ yarn dev:api

# Run the React client in the webpack dev server with HMR
$ yarn dev
```


## TODO

- [x] Fix spell slot and death save toggles
- [ ] Save to database
- [ ] Finish ability to edit stats and character details
- [ ] Add button to add/remove weapons
- [ ] Add ability to edit temp hp and hit dice
- [ ] Create modal for edit wizard for multi-step updates like adding weapons
- [ ] Create modal for error messages
- [ ] Add undo/redo functionality
- [ ] On database errors, rollback the intended local edit and don't send socket message to all clients
- [ ] Add page for dice rolls and history?

