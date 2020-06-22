#!/bin/bash
# https://www.stuartellis.name/articles/shell-scripting/#enabling-better-error-handling-with-set
set -Eeuo pipefail

mongo -- "$MONGO_INITDB_DATABASE" <<EOF
    //const testDB = '$MONGO_TEST_DATABASE';
    //const testUser = '$MONGO_TEST_USERNAME';
    //const testPass = '$MONGO_TEST_PASSWORD';
    //db.createUser({user: testUser, pwd: testPass, roles: [{role: "readWrite", db: 'ecommercetest'}]});
EOF