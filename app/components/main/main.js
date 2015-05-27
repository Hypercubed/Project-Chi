'use strict';

import 'components/main/main.css!';

import app from 'components/app';

class MainCtrl {
  /*@ngInject*/
  constructor(){
    this.awesomeThings = [
      'ES6 Syntax',
      'ES6 Modules via SystemJS',
      'Simple Gulpfile',
      'Component based file structure',
      'Install using NPM and JSPM',
      'Bundle builds via SystemJS Builder',
      'Karma / Jasmine unit tests',
      'Angular Framework',
      'Bootstrap Theme'
    ];
  }
}

app
  .controller('MainCtrl', MainCtrl);
