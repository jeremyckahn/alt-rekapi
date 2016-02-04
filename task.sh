#!/bin/bash

COMMAND=$1
BIN="./node_modules/.bin"

export PATH=$BIN:$PATH

function build () {
  babel src -d lib
}

case "$COMMAND" in
  build )
    build
  ;;

  build-dist )
    webpack -d -p
  ;;

  test )
    build
    mocha
  ;;

  test-watch )
    nodemon \
      --exec "babel src -d lib && mocha" \
      --watch src \
      --watch test
  ;;
esac
