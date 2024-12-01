#!/bin/bash

if [ ! -d "android" ]; then
    npx expo prebuild
fi
cd android
./gradlew assembleRelease
cp app/build/outputs/apk/release/app-release.apk ~/Desktop/app-release.apk