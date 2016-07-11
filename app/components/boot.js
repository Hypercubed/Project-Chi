/*
 this is included so that webcomponents-lite is bundled with the application
 if included here it is loaded first in index.html
 it can be safely excluded if html imports via systemjs-plugin-html are not used
 */
import 'webcomponentsjs/webcomponents-lite.js';

/* Some older browsers need a shim */
import 'core-js/shim';

// import 'jquery';
// import 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';

import 'font-awesome/css/font-awesome.css!';

import angular from 'angular';
import app from './app';

angular.element(document).ready(() => {
  angular.bootstrap(document.body, [app.name], {strictDi: true});
});
