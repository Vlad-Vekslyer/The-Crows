#!/bin/bash

echo "Please make sure you are in a production environment. Starting production server in 3 seconds....";
sleep 3s;

port=$(printenv | grep PORT | cut -c 6-);
host=$(printenv | grep HOST -w | cut -c 6-);

cd ./src/client;
npm install;
REACT_APP_PORT=$port REACT_APP_HOST=$host npm run build;

cd ../../;
npm start
