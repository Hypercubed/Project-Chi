/* global angular */

'use strict';

import 'jquery';
//import 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';

import app from 'components/app';

import 'components/routes';
import 'services/datapackage/mimeType-service';
import 'services/datapackage/dataservice';
import 'components/editor/editor';

function boot() {
  angular.bootstrap(document.body, [ app.name ], { strictDi: true });
}

angular.element(document).ready(boot);
