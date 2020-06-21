#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    let rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    let rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    let admin = db.getSiblingDB('admin');

    admin.auth(rootUser, rootPassword);

    //creating service user
    const serviceUser = '$MONGO_SERVICE_USERNAME';
    const servicePass = '$MONGO_SERVICE_PASSWORD';
    const serviceDB = '$MONGO_SERVICE_DATABASE'
    db.createUser({user: serviceUser, pwd: servicePass, roles: [{role: "readWrite",db: serviceDB}]});

    //creating testing user
    const testUser = '$MONGO_TEST_USERNAME';
    const testPass = '$MONGO_TEST_PASSWORD';
    const testDB = '$MONGO_TEST_DATABASE'
    db.createUser({user: testUser, pwd: testPass, roles: [{role: "readWrite",db: testDB}]})

EOF