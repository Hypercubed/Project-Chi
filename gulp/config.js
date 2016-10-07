'use strict';

import {existsSync} from 'fs';
import {join} from 'path';

import cuid from 'cuid';

import extend from 'deep-extend';
import gutil from 'gulp-util';

import pkg from '../package.json';

import {argv, PROJECT_ROOT, BASE, DIST, TMP, BUILD, ENV, DATASET} from './utils/args';

// Config files at these paths are deeply merged with this config
const overideFiles = [
  join(PROJECT_ROOT, `gulp/config-${ENV}.js`),
  join(PROJECT_ROOT, `${DATASET}/gulp/config.js`),
  join(PROJECT_ROOT, `${DATASET}/gulp/config-${ENV}.js`)
];

/**
 * This is the basic configuration.  It is augmented later with project project and environment specific config
 */
const config = {
  paths: {
    base: BASE,
    dist: DIST,
    temp: TMP,
    build: BUILD,
    systemConfig: './jspm.*.js',
    bundles: 'bundles',
    dataset: DATASET,
    dataLink: `${DATASET}/${BASE}/data/`,
    resources: [  // these are copied to paths.temp and paths.dist
      `${BASE}/*.{js,json,ico,txt,md}`,
      `${BASE}/.nojekyll`,
      `${BASE}/{components,common,assets}/**/*.{png,svg,txt,md}`,
      `${DATASET}/${BASE}/*.{json,ico,txt,md}`,
      `${DATASET}/${BASE}/{components,common,assets}/**/*.{png,svg,md,json}`
    ],
    jspmResources: [  // these are copied to paths.dist
      'jspm_packages/*.{js,map}',
      'jspm_packages/github/jspm/**/*.*',  // for electron
      'jspm_packages/github/twbs/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}',
      'jspm_packages/npm/{angular-growl-v2*,angular-ui-grid*,font-awesome*,intro.js*}/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}'
    ],
    data: [  // these are copied to paths.dist
      `${BASE}/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt,yaml}`,
      `${DATASET}/${BASE}/{components,common,assets,bundles}/**/*.{json,csv,tsv,txt,yaml}`
    ],
    templates: [  // these are copied to paths.temp and paths.dist, but modified by the gulp-template task
      `${BASE}/*.html`,
      `${BASE}/{components,common,bundles}/**/*.html`,
      `${DATASET}/${BASE}/*.html`,
      `${DATASET}/${BASE}/{components,common,bundles}/**/*.html`
    ],
    scripts: [  // these are copied to paths.temp
      `${BASE}/*.js`,
      `${BASE}/{components,common,bundles}/**/*.js`,
      `${DATASET}/${BASE}/{components,common,bundles}/**/*.js`
    ],
    styles: [  // these are copied to paths.temp
      `${BASE}/*.{css,css.map,less}`,
      `${BASE}/{components,common,bundles}/**/*.{css,css.map,less}`,
      `${DATASET}/${BASE}/{components,common,bundles}/**/*.{css,css.map,less}`
    ]
  },
  server: {
    dev: {
      open: argv.open,
      port: argv.port,
      online: argv.online,
      server: {
        baseDir: [TMP, `${DATASET}/${BASE}`, BASE, './'],
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
    // envirnment specific
  },
  pkg,
  VERSION: pkg.version,
  VERSION_CHI: pkg.version,
  APP_TITLE: 'Project-χ',
  ENV,
  DEBUG: argv.debug,
  template: {
    title: 'Project-χ',
    bust: cuid(),
    google: 'UA-XXXXX-X',
    webcomponents: false,
    content: '<app></app>'  // TODO: deprecate
  }
};

// augment with project and environment specific configs
overideFiles.forEach(file => {
  if (existsSync(file)) {
    gutil.log('Found additional gulp config at', gutil.colors.magenta(file));
    const overides = require(file).default;
    extend(config, overides);
  }
});

gutil.log('Running in', gutil.colors.magenta(ENV), 'environment');

export default config;
