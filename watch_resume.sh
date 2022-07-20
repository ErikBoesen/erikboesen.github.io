#!/usr/bin/env bash

last=''
while :; do
    new_last="$(date -r *.tex)"
    if [[ "$last" != "$new_last" ]]; then
        make
        last="$new_last"
    fi
    sleep 1
done
