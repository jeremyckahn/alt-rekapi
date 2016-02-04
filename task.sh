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

  test-debug-ui )
    mocha --debug-brk &
    node-inspector &
    NODE_INSPECTOR_PID=$!
    open "http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858"
    read -r
    kill $NODE_INSPECTOR_PID
    zaport 5858
  ;;
esac
