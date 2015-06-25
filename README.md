# Project χ

Project χ (pronounced project kai or /<abbr title="/ˈ/ primary stress follows">ˈ</abbr><abbr title="'k' in 'kind'">k</abbr><abbr title="/iː/ long 'e' in 'bead'">iː</abbr>/) platform is an modular open source visualization gallery framework built by Jayson Harshbarger at the [RIKEN Institute in Yokohama Japan](http://www.yokohama.riken.jp/english/).  It offers a framework and toolset for building self-hosted data-centric visualization websites. Geared towards sharing of supplemental materials associated with scientific publications; Project χ allows visitors to interact with visualizations, download associated data and images, and even try the visualization with their own uploaded or publicly available datasets.  For developers the framework comes packaged with tools necessary for quickly integrating interactive visualizations using [d3.js](http://d3js.org/), [AngularJS](https://angularjs.org/), and [BioJS](http://biojs.io/).

## Features

* Contains AngularJS services and directives for loading, parsing, and downloading data and as well as downloading generated publication quality SVG images.
* Simple,  modular, and customizable design using [AngularJS](https://angularjs.org/) templates and [bootstrap](http://getbootstrap.com/) CSS framework.
* Supports CommonJS, AMD, and ES6 modules using the [SystemJS](https://github.com/systemjs/systemjs) universal dynamic module loader.
* Integrate additional visualizations, including [BioJS](http://biojs.io/) and [Chiasm](https://github.com/curran/chiasm) modules, directly from any registry such as [NPM](https://www.npmjs.com) or [GitHub](https://github.com/) using [JSPM](http://jspm.io/).
* Self-hosted fully client-side application doesn't require a server; easily hosted on [WebDAV](https://en.wikipedia.org/wiki/WebDAV) or [GitHub Pages](https://pages.github.com/).
* For production builds ES6 into ES5 including minification and bundling using [Gulp](http://gulpjs.com/) and [SystemJS Builder](https://github.com/systemjs/builder).

# For Developers

## Background

If you are not familiar it would be worthwhile to read up on [JSPM](http://jspm.io/), [SystemJS](https://github.com/systemjs/systemjs), and [Gulp](http://gulpjs.com/).

If you don't already have jspm or gulp you should install them globally.

```
npm install jspm -g
npm install gulp -g
```

## Install

```
git clone https://github.com/Hypercubed/Project-Chi.git
cd Project-Chi
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
	+- dist/                  # build goes here
```

## Acknowledgments

This work was supported by a research grant from the Japanese Ministry of Education, Culture, Sports, Science and Technology (MEXT) to the RIKEN Center for Life Science Technologies.

## Reference

TBR

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2015 RIKEN, Japan.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
