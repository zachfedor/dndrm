#!/bin/sh

# Create Application Database and User
# ---
# This script will use the `psql` command to run SQL commands that
# will create the needed database and user for this application.
# A running PostgreSQL server is necessary.
#
# NOTE: You only need to run this script once.
#
# Run with the following command in the project's root directory:
# $ sh bin/create-db.sh

DEV=true

if [ "$1" == "test" ]; then
  DEV=false
fi


# create user for the application
psql postgres -c 'CREATE USER dndrm_user;'

# create development database and grant access to application user
if [ $DEV == true ]; then
  psql postgres -c 'CREATE DATABASE dndrm;'
  psql postgres -c 'GRANT ALL PRIVILEGES ON DATABASE "dndrm" to dndrm_user;'
fi

# create test database and grant access to application user
psql postgres -c 'CREATE DATABASE dndrm_test;'
psql postgres -c 'GRANT ALL PRIVILEGES ON DATABASE "dndrm_test" to dndrm_user;'

psql -f bin/schema.sql dndrm dndrm_user

