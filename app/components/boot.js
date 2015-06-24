/* global angular */

'use strict';

import 'bootstrap/css/bootstrap.css!';
import 'bootstrap/js/bootstrap';

//import 'angular';
import app from 'components/app';

import 'components/routes';
import 'services/datapackage/mimeType-service';
import 'services/datapackage/dataservice';
import 'components/editor/editor';

import 'jquery';

import saveAs from 'FileSaver';
import marked from 'marked';
import Papa from 'papaparse';
import CodeMirror from 'codemirror/lib/codemirror';

window.saveAs = saveAs;
window.Papa = Papa;
window.CodeMirror = CodeMirror;
window.marked = marked;

function boot() {
  angular.bootstrap(document.body, [ app.name ], { strictDi: true });
}

angular.element(document).ready(boot);
