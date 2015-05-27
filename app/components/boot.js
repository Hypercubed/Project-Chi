'use strict';

import 'bootstrap/css/bootstrap.css!';

import angular from 'angular';
import app from 'components/app';

import 'components/routes';

function boot() {
  angular.bootstrap(document.body, [ app.name ]);
}

angular.element(document).ready(boot);
