'use strict';

import fs from 'fs';
import path from 'path';

import extend from 'deep-extend';
import gutil from 'gulp-util';
import {argv} from 'yargs';

const root = path.dirname(__dirname);  // needed so that imports could co-exist with requires (on some edge cases)

const dataSetPath = argv.dataset || 'dataset/example';
const overidesFile = path.join(root, `${dataSetPath}/gulp/config.js`);

const config = {
  paths: {
    base: 'app',
    dist: 'dist',
    temp: '.tmp',
    build: 'components/boot',
    systemConfig: 'app/system.config.js',
    bundle: 'dist/components/bundle.js',
    dataset: dataSetPath,
    dataLink: `${dataSetPath}/app/data`,
    jspmLink: 'app/jspm_packages/',
    resources: [
      'app/*.{js,json,ico,txt,md}',
      'app/.nojekyll',
      'app/{jspm_packages,lib}/*.{js,map}',
      'app/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,gif,wot,woff,woff2}',
      'app/{components,common,assets}/**/*.{png,svg,txt,md}',
      `${dataSetPath}/app/*.{json,ico,txt,md}`,
      `${dataSetPath}/app/{components,common,assets}/**/*.{png,svg,md,json}`
    ],
    data: [
      `app/{components,common,assets}/**/*.{json,csv,tsv,txt}`,
      `${dataSetPath}/app/{components,common,assets}/**/*.{json,csv,tsv,txt}`
    ],
    templates: [
      `app/*.{html,md}`,
      `app/{components,common}/**/*.{html,md}`,
      `${dataSetPath}/app/*.html`,
      `${dataSetPath}/app/{components,common}/**/*.html`
    ],
    scripts: [
      `app/*.js`,
      `app/{components,common}/**/*.js`,
      `${dataSetPath}/app/{components,common}/**/*.js`
    ],
    styles: [
      `app/*.{css,css.map}`,
      `app/{components,common}/**/*.{css,css.map}`,
      `${dataSetPath}/app/{components,common}/**/*.{css,css.map}`
    ]
  },
  devServer: {
    open: false,
    port: 9000,
    online: false,
    server: {
      baseDir: [`${dataSetPath}/app`, 'app'],
      middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  },
  distServer: {
    open: false,
    port: 9000,
    online: false,
    ghostMode: false,
    server: {
      baseDir: 'dist',
      middleware: (req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        next();
      }
    }
  },
  deploy: {
    ghPages: {
      branch: 'gh-pages'
    }
  }
};

if (fs.existsSync(overidesFile)) {
  gutil.log('Found additional gulp config at', gutil.colors.magenta(overidesFile));
  const overides = require(overidesFile).default;
  extend(config, overides);
}

export default config;
