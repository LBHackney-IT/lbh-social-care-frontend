#!/usr/bin/env bash

echo "Create layer directory for node modules"
mkdir -p layer/nodejs/node_modules

echo "Install production dependencies in layer directory"
yarn install --production --modules-folder ./layer/nodejs/node_modules

echo "Change permissions"
chmod +x layer/nodejs/node_modules

echo "Done creating nodejs/node_modules layer"
