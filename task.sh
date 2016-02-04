#!/bin/bash

COMMAND=$1
BIN="./node_modules/.bin"

export PATH=$BIN:$PATH

case "$COMMAND" in
  build )
    babel src -d lib
  ;;

  build-dist )
    webpack -d -p
  ;;
esac
