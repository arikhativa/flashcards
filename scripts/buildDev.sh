#!/bin/bash

if [ ! -d "android" ]; then
    npx expo prebuild
fi
cd android
./gradlew assembleRelease
