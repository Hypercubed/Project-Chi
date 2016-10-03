'use strict';

import {existsSync} from 'fs';
import {join} from 'path';

import cuid from 'cuid';

import extend from 'deep-extend';
import gutil from 'gulp-util';
// import {argv} from 'yargs';

import minimist from 'minimist';

import pkg from '../package.json';

const argv = minimist(process.argv.slice(2), {
  boolean: ['debug', 'dev', 'prod', 'bundle', 'open', 'online'],
  alias: {
    env: ['environment', 'e'],
    dev: ['development'],
    prod: ['production'],
    dataset: ['d']
  },
  default: {
    bundle: false,  // build dev bundle
    open: false,
    dataset: 'dataset/example',
    port: 9000,
    online: false,
    debug: false
  }
});

const PROJECT_ROOT = join(__dirname, '..');  // needed so that imports could co-exist with requires (on some edge cases)

const dataSetPath = join(argv.dataset, '.');
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
const PRODTASKS = ['build', 'dist', 'deploy', 'dist-electron', 'build-electron'];

const BASE = 'app';
const DIST = 'dist';
const TMP = '.tmp';
const BUILD = 'components/boot.js';

/**
 * This is the basic configuration.  It is augmented later with project specific config
 */
const config = {
  paths: {
    base: BASE,
    dist: DIST,
    temp: TMP,
    build: BUILD,
    systemConfig: './jspm.*.js',
    bundles: 'bundles',
    dataset: dataSetPath,
    dataLink: `${dataSetPath}/${BASE}/data/`,
    resources: [  // these are copied to paths.temp and paths.dist
      `${BASE}/*.{js,json,ico,txt,md}`,
      `${BASE}/.nojekyll`,
      `${BASE}/{components,common,assets}/**/*.{png,svg,txt,md}`,
      `${dataSetPath}/${BASE}/*.{json,ico,txt,md}`,
      `${dataSetPath}/${BASE}/{components,common,assets}/**/*.{png,svg,md,json}`
    ],
    jspmResources: [  // these are copied to paths.dist
      'jspm_packages/*.{js,map}',
      'jspm_packages/github/jspm/**/*.*',  // for electron
      'jspm_packages/github/twbs/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}',
      'jspm_packages/npm/{angular-growl-v2*,angular-ui-grid*,font-awesome*,intro.js*}/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}'
    ],
    data: [  // these are copied to paths.dist
      `${BASE}/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt,yaml}`,
      `${dataSetPath}/${BASE}/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt,yaml}`
    ],
    templates: [  // these are copied to paths.temp and paths.dist, but modified by the gulp-template task
      `${BASE}/*.html`,
      `${BASE}/{components,common,bundles}/**/*.html`,
      `${dataSetPath}/${BASE}/*.html`,
      `${dataSetPath}/${BASE}/{components,common,bundles}/**/*.html`
    ],
    scripts: [  // these are copied to paths.temp
      `${BASE}/*.js`,
      `${BASE}/{components,common,bundles}/**/*.js`,
      `${dataSetPath}/${BASE}/{components,common,bundles}/**/*.js`
    ],
    styles: [  // these are copied to paths.temp
      `${BASE}/*.{css,css.map}`,
      `${BASE}/{components,common,bundles}/**/*.{css,css.map}`,
      `${dataSetPath}/${BASE}/{components,common,bundles}/**/*.{css,css.map}`
    ]
  },
  server: {
    dev: {
      open: argv.open,
      port: argv.port,
      online: argv.online,
      server: {
        baseDir: [TMP, `${dataSetPath}/${BASE}`, BASE, './'],
        middleware: (req, res, next) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
          next();
        }
      }
    },
    dist: {
      open: argv.open,
      port: argv.port,
      online: argv.online,
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
    'devBundle': argv.bundle,
    'bundles': {
      'deps-bundle': `${TMP}/${BUILD} - [${TMP}/**/*] - [${TMP}/**/*!css] - [${TMP}/**/*!text] - [${TMP}/**/*!md] + util`,
      'app-bundle': `${TMP}/${BUILD} - ${TMP}/bundles/deps-bundle.js`
    },
    'config': {
      buildCSS: true,
      buildHTML: true,
      separateCSS: true,
      paths: {
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*',
        'components/*': `${TMP}/components/*`,
        'common/*': `${TMP}/common/*`,
        'bundles/*': `${TMP}/bundles/*`
      }
    },
    'config-dev-bundle': {
      buildCSS: true,
      buildHTML: true,
      separateCSS: true,
      paths: {
        'github:*': 'jspm_packages/github/*',
        'npm:*': 'jspm_packages/npm/*',
        'components/*': 'app/components/*',
        'common/*': 'app/common/*',
        'bundles/*': 'app/bundles/*'
      }
    },
    'bundle': {
      sourceMaps: true,
      minify: true,
      mangle: false,
      runtime: false,
      esOptimize: true,
      cssOptimize: true,
      rollup: true
    },
    'bundle-dev': {
      sourceMaps: true,
      minify: false,
      mangle: false,
      runtime: false,
      esOptimize: false,
      cssOptimize: false,
      rollup: false
    }
  },
  pkg,
  VERSION: pkg.version,
  VERSION_CHI: pkg.version,
  APP_TITLE: 'Project-χ',
  ENV: getEnvironment(),
  DEBUG: argv.debug,
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
  let env = ENVIRONMENTS.DEVELOPMENT;
  if (typeof argv.env === 'string') {
    env = argv.env.toLowerCase();
  } else if (argv.prod) {
    env = ENVIRONMENTS.PRODUCTION;
  } else if (argv.dev) {
    env = ENVIRONMENTS.DEVELOPMENT;
  } else if (Array.isArray(argv._)) {
    if (argv._.some(o => PRODTASKS.indexOf(o) >= 0)) {
      env = ENVIRONMENTS.PRODUCTION;
    }
  }
  return (env === ENVIRONMENTS.PRODUCTION) ? ENVIRONMENTS.PRODUCTION : ENVIRONMENTS.DEVELOPMENT;
}
