# SystemJS, JSPM, AngularJS, Bootstrap

## Features

Based on [angular-generator](https://github.com/yeoman/generator-angular) and  [angular-systemjs-seed](https://github.com/Swimlane/angular-systemjs-seed) project.

- ES6 Syntax via Babel with source maps
- ES6 Modules via SystemJS
- Simple Gulpfile
- Component based file structure
- Test located with components
- ControllerAs syntax
- Install using NPM and JSPM
- Karma / Jasmine unit tests
- Bundle builds via SystemJS Builder
- Angular Framework
- Bootstrap Theme

## Background

If you are not familiar it would be worthwhile to read up on [jspm](http://jspm.io/), and [SystemJS](https://github.com/systemjs/systemjs).

If you don't already have jspm or gulp you should install them globally.

```
npm install jspm -g
npm install gulp -g
```

## Install

```
git clone https://github.com/Hypercubed/angular-systemjs-starter.git
cd angular-systemjs-starter
npm install # jspm install is run postinstall by npm
```

## Run

```
gulp watch
```

## Gulp Tasks

* `gulp watch`, run development server and watch for file changes
* `gulp test`, run karma tests
* `gulp build`, build distribution directory
* `gulp serve:dist`, run distribution server for testing
* `gulp deploy`, push to gh-pages
* `gulp run`, run development server, karma tests and watch for file changes

## File Structure

```
/root
	+- package.json
	+- gulpfile.js
	+- karma.conf.js
	+- app/
		+- jspm_packages/
		+- components/        # includes tests
		+- system.config.js
		+- index.html
	+- dist/                # build goes here
```
