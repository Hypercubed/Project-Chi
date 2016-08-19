'use strict';

import {existsSync} from 'fs';
import {join} from 'path';

import cuid from 'cuid';

import extend from 'deep-extend';
import gutil from 'gulp-util';
// import {argv} from 'yargs';

import minimist from 'minimist';

import pkg from '../package.json';

const argv = minimist(process.argv.slice(2));

const PROJECT_ROOT = join(__dirname, '..');  // needed so that imports could co-exist with requires (on some edge cases)

const dataSetPath = join(argv.dataset || argv.d || 'dataset/example', '.');
const overidesFile = join(PROJECT_ROOT, `${dataSetPath}/gulp/config.js`);

/**
 * Available environments.
 */
const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  PRODUCTION: 'prod'
};

/**
 * These tasks force ENVIRONMENTS.PRODUCTION
 */
const PRODTASKS = ['build', 'dist', 'deploy'];

const DIST = 'dist';
const TMP = '.tmp';
const BUILD = 'components/boot.js';

/**
 * This is the basic configuration.  It is augmented later with project specific config
 */
const config = {
  paths: {
    base: 'app',
    dist: DIST,
    temp: TMP,
    build: BUILD,
    systemConfig: './jspm.*.js',
    bundles: 'bundles',
    dataset: dataSetPath,
    dataLink: `${dataSetPath}/app/data/`,
    resources: [  // these are copied to paths.temp and paths.dist
      'app/*.{js,json,ico,txt,md}',
      'app/.nojekyll',
      'app/{components,common,assets}/**/*.{png,svg,txt,md}',
      `${dataSetPath}/app/*.{json,ico,txt,md}`,
      `${dataSetPath}/app/{components,common,assets}/**/*.{png,svg,md,json}`
    ],
    jspmResources: [  // these are copied to paths.dist
      'jspm_packages/*.{js,map}',
      'jspm_packages/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}'
    ],
    data: [  // these are copied to paths.dist
      `app/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt}`,
      `${dataSetPath}/app/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt}`
    ],
    templates: [  // these are copied to paths.temp and paths.dist, but modified by the gulp-template task
      `app/*.html`,
      `app/{components,common,bundles}/**/*.html`,
      `${dataSetPath}/app/*.html`,
      `${dataSetPath}/app/{components,common,bundles}/**/*.html`
    ],
    scripts: [  // these are copied to paths.temp
      `app/*.js`,
      `app/{components,common,bundles}/**/*.js`,
      `${dataSetPath}/app/{components,common,bundles}/**/*.js`
    ],
    styles: [  // these are copied to paths.temp
      `app/*.{css,css.map}`,
      `app/{components,common,bundles}/**/*.{css,css.map}`,
      `${dataSetPath}/app/{components,common,bundles}/**/*.{css,css.map}`
    ]
  },
  server: {
    dev: {
      open: Boolean(argv.open),
      port: argv.port || 9000,
      online: Boolean(argv.online),
      server: {
        baseDir: [TMP, `${dataSetPath}/app`, 'app', './'],
        middleware: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    },
    dist: {
      open: Boolean(argv.open),
      port: argv.port || 9000,
      online: Boolean(argv.online),
      ghostMode: false,
      server: {
        baseDir: DIST,
        middleware: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    }
  },
  deploy: {
    /* empty to avoid accidental deploy
    ghPages: {
      "remoteUrl": "git@github.com:Hypercubed/Project-Chi.git",
      "branch": "gh-pages"
    } */
  },
  builder: {
    bundles: {
      'deps-bundle': `${TMP}/${BUILD} - [${TMP}/**/*] - [${TMP}/**/*!css] - [${TMP}/**/*!text] - [${TMP}/**/*!md]`,
      'app-bundle': `${TMP}/${BUILD} - ${TMP}/bundles/deps-bundle.js`
    },
    config: {
      buildCSS: true,
      buildHTML: true,
      // rootURL: '.',
      separateCSS: true,
      paths: {
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*',
        'components/*': `${TMP}/components/*`,
        'common/*': `${TMP}/common/*`,
        'bundles/*': `${TMP}/bundles/*`
      }
    },
    bundle: {
      sourceMaps: true,
      minify: true,
      mangle: false,
      runtime: false,
      esOptimize: true,
      cssOptimize: true,
      rollup: true
    }
  },
  pkg,
  VERSION: pkg.version,
  VERSION_CHI: pkg.version,
  APP_TITLE: 'Project-χ',
  ENV: getEnvironment(),
  DEBUG: argv.debug || false,
  template: {
    title: 'Project-χ',
    bust: cuid(),
    google: 'UA-XXXXX-X',
    webcomponents: false,
    content: '<app></app>'  // TODO: deprecate
  }
};

// augmented with project specific config
if (existsSync(overidesFile)) {
  gutil.log('Found additional gulp config at', gutil.colors.magenta(overidesFile));
  const overides = require(overidesFile).default;
  extend(config, overides);
}

gutil.log('Running in', gutil.colors.magenta(config.ENV), 'environment');

export default config;

function getEnvironment () {
  const base = argv._;
  const prodKeyword = base.some(o => PRODTASKS.indexOf(o) >= 0);
  const env = (argv.env || '').toLowerCase();
  if ((base && prodKeyword) || env === ENVIRONMENTS.PRODUCTION) {
    return ENVIRONMENTS.PRODUCTION;
  }
  return ENVIRONMENTS.DEVELOPMENT;
}
