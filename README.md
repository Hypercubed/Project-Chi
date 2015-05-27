# SystemJS, JSPM, AngularJS, Bootstrap

## Features

Based on [angular-generator](https://github.com/yeoman/generator-angular) and  [angular-systemjs-seed](https://github.com/Swimlane/angular-systemjs-seed) project.

- ES6 Syntax via Babel with source maps
- ES6 Modules via SystemJS
- Simple Gulpfile
- Component based file structure, test located with components
- Install using NPM and JSPM
- Karma / Jasmine unit tests
- Bundle builds via SystemJS Builder
- Angular Framework
- Bootstrap Theme

## Install

```
git clone https://github.com/Hypercubed/angular-systemjs-starter.git
cd angular-systemjs-starter
npm install
```

## Run

```
gulp watch
```

## Gulp Tasks

* `gulp watch`, run development server and watch for file changes
* `gulp test`, run karma tests
* `gulp build`, build distribution directory
* `gulp serve:dist`, run distribution server
