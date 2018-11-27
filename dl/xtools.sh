#!/bin/bash

touch /tmp/.com.apple.dt.CommandLineTools.installondemand.in-progress;
# softwareupdate -l creates more opportunities for being blocked, so this will work better if you're on High Sierra
softwareupdate -i "Command Line Tools (macOS High Sierra version 10.13) for Xcode-9.4" --verbose
