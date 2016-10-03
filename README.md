# Project χ

Project χ (pronounced project /ˈ</span><span title="'k' in 'kind'">k</span><span title="/aɪ/ long 'i' in 'tide'">aɪ</span></span>/) is a modular open-source toolkit for building web and electron data visualization applications.  It offers a boilerplate and toolset for building self-hosted data-centric and electron ready visualization applications. Geared towards sharing of supplemental materials associated with scientific publications, Project χ allows visitors to interact with visualizations, download associated data and images and try the visualization with their own uploaded or publicly available datasets.  For developers the toolkit comes preconfigured with the popular design frameworks (Twitter Bootstrap, Angular UI) and cutting edge build tools (gulp, jspm, SystemJS) and examples integrating interactive visualizations using [d3.js](http://d3js.org/), [AngularJS](https://angularjs.org/), and [BioJS](http://biojs.io/).


[![Join the chat at https://gitter.im/Hypercubed/Project-Chi](https://badges.gitter.im/Hypercubed/Project-Chi.svg)](https://gitter.im/Hypercubed/Project-Chi?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/Hypercubed/Project-Chi.svg?branch=master)](https://travis-ci.org/Hypercubed/Project-Chi)


**Note: Project χ is experimental.  Many things will change.  If you are interested in this project or have issues please feel free to contact me.**

## Features

* Contains AngularJS (v1.5) services and directives for loading, parsing, and downloading tabular data and as well as downloading generated publication quality SVG images.
* Simple,  modular and customizable design using [AngularJS](https://angularjs.org/) templates and [bootstrap](http://getbootstrap.com/) CSS framework.
* Supports CommonJS, AMD, and ES6 modules using the [SystemJS](https://github.com/systemjs/systemjs) universal dynamic module loader.
* Integrate with visualization tools, including [BioJS](http://biojs.io/), [Vega and Vega-lite](http://vega.github.io/) and [Chiasm](https://github.com/curran/chiasm) modules, installed directly from any registry such as [NPM](https://www.npmjs.com) or [GitHub](https://github.com/) using [JSPM](http://jspm.io/).
* Self-hosted fully client-side application doesn't require a server; easily hosted on [WebDAV](https://en.wikipedia.org/wiki/WebDAV) or [GitHub Pages](https://pages.github.com/).
* Optionally build to an [electron](http://electron.atom.io/) app.
* For production builds ES6 into optimized, production ready ES5 code using [Gulp](http://gulpjs.com/) and [SystemJS Builder](https://github.com/systemjs/builder).
* Modular separation of boilerplate (Project χ) and user projects.  Share tools across projects.

# For Developers

## Background

If you are not familiar, it would be worthwhile to read up on [jspm](http://jspm.io/), [SystemJS](https://github.com/systemjs/systemjs) and [gulp](http://gulpjs.com/).

If you don't already have jspm or gulp you should install them globally.

```bash
npm install -g gulp-cli jspm
```

## Install Project χ

```bash
git clone -b master https://github.com/Hypercubed/Project-Chi.git --single-branch --depth 50
cd Project-Chi
npm install # jspm install is run post-install by npm
```

## Run examples

```bash
gulp dev  # uses the default "example" dataset (same as gulp dev --dataset=./dataset/example)
```

You are now ready to develop the project in the app folder.  See "Separation of template and dataset" below.

## Requirements

- node/npm (tested in both v4 & v6)
- gulp v3.9
- jspm v0.17

## Gulp Tasks

* `gulp dev`, run development server (building is not required)
* `gulp build`, build into the `dist` directory
* `gulp dist`, build and run server from `dist` directory
* `gulp deploy`, build and push to `gh-pages`
* `gulp dev-electron`, run development server, open in electron
* `gulp dist-electron`, build and run server from `dist` directory, open in electron
* `gulp build-electron`, build into the `dist` directory, then build electron app

## File Structure

```
.
├── app/                   <- browser application resources
│   ├── bundles/           <- resource bundles
│   ├── common/            <- shared tools
│   │   ├── components/
│   │   ├── directives/
│   │   ├── filters/
│   │   ├── partials/
│   │   ├── services/
│   │   └── styles/
│   ├── components/        <- site components (pages)
│   │   ├── about/
│   │   ├── error/
│   │   ├── boot.js
│   │   ├── app.js
│   │   ├── app.css
│   │   └── routes.js
│   ├── electron.js        <- electron entry point
│   └── index.html         <- single page application
├── gulp/
│   ├── tasks/             <- gulp tasks
│   │   ├── build.js
│   │   ├── deploy.js
│   │   ├── jspm.js
│   │   ├── electron.js
│   │   ├── other.js
│   │   └── server.js
│   └── config.js          <- gulp config
├── dataset/               <- datasets
│   └── example/           <- default example dataset
│       └── ...            <- see File Structure of datasets below
├── .tmp/                  <- temporary build goes here
├── dist/                  <- build goes here
├── node_modules/          <- npm packages are installed here
├── jspm_packages/         <- jspm packages are installed here
├── package.json           <- metadata used by npm and jspm
├── system.config.js       <- SystemJS configuration generated by jspm
├── gulpfile.babel.js      <- gulp script
├── CHANGELOG.md
├── README.md
├── credits.md
└── todo.md
```

## Separation of template and dataset

By default all content in the `app` directory will be served by the development server when running `gulp dev` and built into the `dist` folder when running `gulp build`.  However, to encourage contribution back to the `project-χ` repository and enable using the same `project-χ` source across multiple projects the developer may put project specific resources and configuration into a separate directory.  This folder can then be served and built along with the `project-χ` core.  For example, if you create a `extra` folder inside the `dataset` directory the following commands will work as indicated:

* `gulp dev --dataset=./dataset/extra`

	runs the development server, serving the combination of the `app` directory and `dataset/extra` directories as the web root.  Files in `dataset/extra/app` override `app` and `dataset/extra/gulp/config.js` augments (deep-extends) `gulp/config.js`.  If no dataset is given `./dataset/example` is assumed.

* The `gulp build`, `gulp dist`, `gulp deploy` all work similarly.

### File Structure of dataset

File structure of a sub-project (dataset) is similar that of the Project-χ root structure.  All directories and files are optional.

```
.
├── app/               <- application resources here override Project-Chi/app
│   ├── components/    <- site components combine with and override Project-Chi/app/components/
│   ├── common/        <- shared tools that combine with and override Project-Chi/app/common/
│   ├── data/          <- special data folder that will be symlinked on build, good for large data
│   └── index.html     <- optionally override Project-Chi/app/index.html (usually not needed)
└── gulp/
    └── config.js      <- gulp config augments (deep-extends) Project-Chi/app/gulp/config.js`
```

## Provided services and directives

TBR

## Examples

- [Project-χ](http://hypercubed.github.io/Project-Chi/)
- [DEIVA](https://hypercubed.github.io/DEIVA/)
- [PCA Example](https://thorwahlestedt.github.io/thor-chi/#/examples/pca)

## Contributing

Yes, [please](https://github.com/Hypercubed/Project-chi/issues).

# Acknowledgments

This work was supported by a research grant from the Japanese Ministry of Education, Culture, Sports, Science and Technology (MEXT) to the RIKEN Center for Life Science Technologies.

## Reference

TBD

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

Copyright (c) 2015-2016 RIKEN, Japan.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
