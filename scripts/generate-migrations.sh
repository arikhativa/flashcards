#!/bin/bash

if [ -z "$1" ]; then
  echo "No argument provided"
  exit 1
fi

MIG_NAME=$1

cd db/migrations

npx typeorm-ts-node-commonjs migration:generate $MIG_NAME -d ../typeorm.config.ts 