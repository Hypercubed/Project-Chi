'use strict';

// import path from 'path';
import {argv} from 'yargs';

// const root = path.dirname(__dirname);//needed so that imports could co-exist with requires (on some edge cases)

const dataSetPath = argv.dataset || 'dataset/example';

const paths = {
  base: 'app',
  build: 'components/boot',
  systemConfig: 'app/system.config.js',
  dist: 'dist',
  bundle: 'dist/components/bundle.js',
  dataset: dataSetPath,
  temp: '.tmp',
  resources: [
    'app/*.{js,json,ico,txt,md}',
    'app/{jspm_packages,lib}/*.{js,map}',
    'app/{jspm_packages,lib}/**/*.{svg,png,eot,ttf,wot,woff,woff2,gif,html}',
    'app/{components,common,assets}/**/*.{png,svg,txt,md}',
    `${dataSetPath}/*.{json,ico,txt,md}`,
    `${dataSetPath}/{components,common,assets}/**/*.{png,svg,md,json}`
  ],
  data: [
    `app/{components,common,assets}/**/*.{json,csv,tsv,txt}`,
    `${dataSetPath}/{components,common,assets}/**/*.{json,csv,tsv,txt}`
  ],
  templates: [
    `app/*.{html,md}`,
    `app/{components,common}/**/*.{html,md}`,
    `${dataSetPath}/*.html`,
    `${dataSetPath}/{components,common}/**/*.html`
  ],
  scripts: [
    `app/*.js`,
    `app/{components,common}/**/*.js`,
    `${dataSetPath}/{components,common}/**/*.js`
  ],
  styles: [
    `app/*.{css,css.map}`,
    `app/{components,common}/**/*.{css,css.map}`,
    `${dataSetPath}/{components,common}/**/*.{css,css.map}`
  ]
};

export default paths;
