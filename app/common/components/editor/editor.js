/* global FileReader, Blob */

import angular from 'angular';

import 'ui-codemirror';

import 'codemirror/lib/codemirror';

import 'codemirror/lib/codemirror.css!';
import './editor.css!';

import svgDropdownDownload from 'common/directives/svg-download-dropdown';
import fileDrop from 'common/directives/file-drop';
import fileDownload from 'common/directives/file-download';
import dataServices from 'common/services/datapackage/index';

import 'common/services/datapackage/datapackage';

import template from './editor.html!text';

import controller from './editor-controller';

const editor = angular
  .module('projectX.dataEditor', [
    'ui.codemirror',
    dataServices,
    svgDropdownDownload,
    fileDrop,
    fileDownload
  ])
  .directive('datapackageEdit', () => ({  // old Attribute syntax
    restrict: 'A',
    scope: {},
    bindToController: {
      options: '=datapackageEdit'
    },
    controller,
    controllerAs: '$ctrl',
    transclude: true,
    template
  }))
  .component('packageEditor', {  // new Element syntax
    template,
    controller,
    transclude: true,
    bindings: {
      options: '='
    }
  })
  ;

export default editor.name;
