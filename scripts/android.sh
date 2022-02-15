#!/bin/bash

adb kill-server
adb connect $(hostname).local:58526
adb -s $(hostname).local:58526 reverse tcp:8081 tcp:8081

npx react-native run-android --deviceId=$(hostname).local:58526
