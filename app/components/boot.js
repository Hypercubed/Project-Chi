import 'jquery';
import 'bootstrap/js/bootstrap';
import 'bootstrap/css/bootstrap.css!';

import angular from 'angular';
import app from 'components/app';

angular.element(document).ready(function boot () {
  angular.bootstrap(document.body, [ app.name ], { strictDi: true });
});
