'use strict';

import {existsSync} from 'fs';
import {join} from 'path';

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

/**
 * This is the basic configuration.  It is augmented later with project specific config
 */
const config = {
  paths: {
    base: 'app',
    dist: DIST,
    temp: TMP,
    build: 'components/boot',
    systemConfig: 'app/system.config.js',
    bundle: 'dist/components/bundle.js',
    dataset: dataSetPath,
    dataLink: `${dataSetPath}/app/data/`,
    jspmLink: 'app/jspm_packages/',
    resources: [  // these are copied to paths.temp and paths.dist
      'app/*.{js,json,ico,txt,md}',
      'app/.nojekyll',
      'app/{components,common,assets}/**/*.{png,svg,txt,md}',
      `${dataSetPath}/app/*.{json,ico,txt,md}`,
      `${dataSetPath}/app/{components,common,assets}/**/*.{png,svg,md,json}`
    ],
    jspmResources: [  // these are copied to paths.dist
      'app/{jspm_packages,lib}/*.{js,map}',
      'app/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}'
    ],
    data: [  // these are copied to paths.dist
      `app/{components,common,assets}/**/*.{json,csv,tsv,txt}`,
      `${dataSetPath}/app/{components,common,assets}/**/*.{json,csv,tsv,txt}`
    ],
    templates: [  // these are copied to paths.temp and paths.dist, but modified by the gulp-template task
      `app/*.html`,
      `app/{components,common}/**/*.html`,
      `${dataSetPath}/app/*.html`,
      `${dataSetPath}/app/{components,common}/**/*.html`
    ],
    scripts: [  // these are copied to paths.temp
      `app/*.js`,
      `app/{components,common}/**/*.js`,
      `${dataSetPath}/app/{components,common}/**/*.js`
    ],
    styles: [  // these are copied to paths.temp
      `app/*.{css,css.map}`,
      `app/{components,common}/**/*.{css,css.map}`,
      `${dataSetPath}/app/{components,common}/**/*.{css,css.map}`
    ]
  },
  devServer: {
    open: Boolean(argv.open),
    port: argv.port || 9000,
    online: Boolean(argv.online),
    server: {
      baseDir: [TMP, `${dataSetPath}/app`, 'app'],
      middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  },
  distServer: {
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
  },
  deploy: {
    // empty to avoid accidental deploy
  },
  pkg,
  VERSION: pkg.version,
  VERSION_CHI: pkg.version,
  APP_TITLE: 'Project-χ',
  ENV: getEnvironment(),
  DEBUG: argv.debug || false,
  template: {
    google: 'UA-XXXXX-X',
    webcomponents: true,
    content: `
      <div class="header" ng-include="'common/partials/header.html'"></div>

      <div class="container">
        <div ng-view=""></div>
      </div>

      <div class="footer" ng-include="'common/partials/footer.html'">
      </div>

      <div growl></div>
    `
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
