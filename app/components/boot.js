/*
 this is included so that webcomponents-lite is bundled with the application
 if included here it is loaded first in index.html
 it can be safely excluded if html imports via systemjs-plugin-html are not used
 */
import 'webcomponentsjs/webcomponents-lite.js';

/* Some older browsers need a shim. needed for Object.values */
import 'core-js/client/shim';

// saveAs shim
import saveAs from 'FileSaver/FileSaver.js';

// import 'jquery';
// import 'bootstrap/js/bootstrap';
import 'bootstrap/less/bootstrap.less!';

import 'font-awesome/less/font-awesome.less!';

import angular from 'angular';
import app from './app';

window.saveAs = saveAs;

angular.element(document).ready(() => {
  angular.bootstrap(document.body, [app.name], {strictDi: true});
});
