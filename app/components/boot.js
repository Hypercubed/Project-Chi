'use strict';

import 'bootstrap/css/bootstrap.css!';

import angular from 'angular';
import app from 'components/app';

import 'components/routes';

angular.element(document).ready(function() {
  //console.log('angular ready');
  angular.bootstrap(document.body, [ app.name ]);
});
