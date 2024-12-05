#!/bin/bash

cd android
./gradlew assembleRelease
cp app/build/outputs/apk/release/app-release.apk ~/Desktop/app-release.apk