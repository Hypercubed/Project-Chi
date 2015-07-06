/* global angular */

'use strict';

import 'jquery';
//import 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';

import 'd3';

import app from 'components/app';

function boot() {
  angular.bootstrap(document.body, [ app.name ], { strictDi: true });
}

angular.element(document).ready(boot);
