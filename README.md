# alt-rekapi - Keyframes for JavaScript

alt-rekapi is an alternative implementation of [Rekapi](https://github.com/jeremyckahn/rekapi).  This project was initially intended to be Rekapi 2.0, but the API and core concepts ended up being different enough to warrant being spun off as a new project.

# Project status

alt-rekapi is in development and **incomplete**.  It is not ready to be used, which is why there is no `master` branch yet.

# Goals

alt-rekapi aims to solve many of the same problems as Rekapi, but it is not intended to ever be a drop-in replacement for or achieve feature parity with Rekapi.  alt-rekapi is built upon different foundational technologies — specifically [Redux](http://redux.js.org/) and [Immutable](http://facebook.github.io/immutable-js/) — that allow it to more effectively manage timeline state.  One of the motivations for starting this project was to more effectively support Undo functionality for downstream projects.  alt-rekapi is also written in ES6 for improved code clarity and maintainability, and has been developed from the beginning with a [TDD](https://en.wikipedia.org/wiki/Test-driven_development) workflow to ensure a high degree of code coverage.

# Development

Development is only supported on OS X right now.  Linux might work.

## Installation

````
git clone https://github.com/jeremyckahn/alt-rekapi.git
cd alt-rekapi
npm install
````

## Tests

````
npm run test

# If you want to run tests continuously for a TDD workflow (highly recommended!):
npm run test:watch
````

## Debugging

````
# Debug with the Node CLI debugger
npm run test:debug

# Debug graphically with node-inspector
npm run test:debug:ui
````

## Building

````
# Create a development build
npm run build

# Create a production-ready build
npm run build:dist
````
