#!/bin/bash

cd db/migrations

npx typeorm-ts-node-commonjs migration:run  -d ../typeorm.config.ts 