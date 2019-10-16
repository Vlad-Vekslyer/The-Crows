#!/bin/bash

env=$(cat ./.env | grep ENV);
env=${env:4};
if [ "$env" = "PROD" ]
then
  port=$(cat ./.env | grep PORT | cut -c 6-);
  host=$(cat ./.env | grep HOST -w | cut -c 6-);

  cd ./src/client;
  REACT_APP_PORT=$port REACT_APP_HOST=$host npm run build;

  cd ../../;
  tsc;
  node output/index.js;
else
  echo "Must be in a production environment to run prod";
fi
