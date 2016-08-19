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

import dp from 'common/services/datapackage/datapackage';

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
  /* .directive('resource', () => {
    return {
      require: 'ngModel',
      scope: {
        resource: '=',
        datapackage: '='
      },
      link (scope, elm, attrs, ctrl) {
        ctrl.$validators.validInput = function (modelValue, viewValue) {
          try {
            console.log(modelValue, viewValue);
            const resource = {...scope.resource, content: viewValue};
            dp.normalizeResource(scope.datapackage, resource);
            dp.processResource(scope.resource);
          } catch (err) {
            return false;
          }
          return true;
        };
      }
    };
  }) */
  ;

export default editor.name;
