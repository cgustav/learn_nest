#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    let rootUser = '$MONGO_INITDB_ROOT_USERNAME';
    let rootPassword = '$MONGO_INITDB_ROOT_PASSWORD';
    let admin = db.getSiblingDB('admin');
    admin.auth(rootUser, rootPassword);

    const user = '$MONGO_INITDB_USERNAME';
    const passwd = '$MONGO_INITDB_PASSWORD';
    const authdb = '$MONGO_INITDB_DATABASE'
    db.createUser({user: user, pwd: passwd, roles: [{role: "readWrite",db: authdb}]});
EOF