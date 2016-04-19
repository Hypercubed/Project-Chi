// import 'core-js/shim';

import 'jquery';
import 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';

import angular from 'angular';
import app from 'components/app';

angular.element(document).ready(() => {
  angular.bootstrap(document.body, [app.name], {strictDi: true});
});
