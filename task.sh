#!/bin/bash

COMMAND=$1
BIN="./node_modules/.bin"

export PATH=$BIN:$PATH

function build () {
  babel src -d tmp
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
    mocha --recursive
  ;;

  test-watch )
    nodemon \
      --exec "babel src -d tmp && mocha --recursive" \
      --watch src \
      --watch test
  ;;

  test-debug )
    babel src -d tmp
    mocha --recursive debug
  ;;

  test-debug-ui )
    mocha --recursive --debug-brk &
    node-inspector &
    NODE_INSPECTOR_PID=$!
    open "http://127.0.0.1:8080/?ws=127.0.0.1:8080&port=5858"
    read -r
    kill $NODE_INSPECTOR_PID
    zaport 5858
  ;;
esac
