'use strict';

import app from 'components/app';

class AboutCtrl{
  constructor(){
    this.awesomeThings = [
      'ES6 Syntax',
      'ES6 Modules via SystemJS',
      'Simple Gulpfile',
      'Component based file structure',
      'Install using NPM and JSPM',
      'Deploy to gh-pages',
      'Bundle builds via SystemJS Builder',
      'Karma / Jasmine unit tests',
      'Angular Framework',
      'Bootstrap Theme'
    ];
  }
}

app
  .controller('AboutCtrl', AboutCtrl);
