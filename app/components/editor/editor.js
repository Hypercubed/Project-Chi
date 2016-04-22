/* global FileReader, Blob */

import angular from 'angular';

import 'codemirror/lib/codemirror';

import 'codemirror/lib/codemirror.css!';
import 'components/editor/editor.css!';

import svgDropdownDownload from 'common/directives/svg-download-dropdown';
import fileDrop from 'common/directives/file-drop';
import fileDownload from 'common/directives/fileDownload';
import mime from 'common/services/datapackage/mime';

import template from './editor.html!text';

const moduleName = 'projectX.dataEditor';

export default moduleName;

angular
.module(moduleName, ['projectX.dataService', svgDropdownDownload, fileDrop, fileDownload])
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
});

controller.$inject = ['$cookies', '$timeout', 'dataService'];
function controller ($cookies, $timeout, dataService) {
  const hasPackage = Boolean(this.options) && Boolean(this.options.data);

  const isSafari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
  const isIE = typeof window.navigator.msSaveBlob !== 'undefined';

  const $ctrl = Object.assign(this, {
    // "internal"
    panel: {
      open: false
    },
    change,
    remove,
    rename,
    newFile,
    dropped,
    tooglePanel,
    play,
    droppedOver,
    ui: {
      refresh: () => {
        $ctrl.ui.count++;
      },
      count: 0,
      codemirrorLoaded: cm => {
        $timeout(() => {
          cm.refresh();
          $ctrl.ui.refresh();
        }, 100);
      }
    },

    // user config events
    onChange: () => {},

    // user config defaults
    enableOpen: hasPackage,
    enableFileDownload: hasPackage && this.options.data.resources.length > 0,
    enableSvgDownload: true,
    enablePngDownload: !isSafari && !isIE,
    enableAdd: true,
    enableDrop: false,
    enableProtected: false,
    types: ['text/plain', 'text/csv', 'text/tab-separated-values', 'application/json']

    // svgsFrom: '#chart' // TODO
  }, this.options);

  if ($ctrl.enableFileDownload) {
    $ctrl.data.resources[0].active = true;
  }

  function droppedOver ($index, file) {
    const resource = {
      path: file.name || 'file',
      name: file.name || 'file',
      mediatype: mime.lookup(file.name),
      content: file.content || '',
      active: true
    };

    $ctrl.data.resources.splice($index, 1, resource);

    change(resource);
    $ctrl.ui.refresh();
  }

  function refresh (file) {
    dataService.processResource(file);
  }

  function play () {
    if ($ctrl.data && $ctrl.data.readme) {
      $ctrl.data.readme = null;
    }
    tooglePanel();
  }

  function change (file) {
    refresh(file);
    $ctrl.onChange();
  }

  function remove (i) {
    if (i > -1) {
      $ctrl.data.resources.splice(i, 1);
      $ctrl.onChange();
    }
  }

  function rename (file) {
    if (!file.path) {
      return;
    }
    file.name = file.path;
    file.mediatype = mime.lookup(file.path);
    change(file);
  }

  function newFile (filename) {
    filename = filename || 'new.txt';

    const resource = {
      name: filename,
      path: filename,
      mediatype: mime.lookup(filename),
      content: ''
    };

    resource.active = true;

    const i = $ctrl.data.resources.push(resource);
    $ctrl.data.resources[i - 1].active = true;

    change(resource);

    $timeout($ctrl.ui.refresh, 100);

    return false;
  }

  function dropped (file) {
    const resource = {
      path: file.name,
      mediatype: mime.lookup(file.name),
      content: file.content || ''
    };

    resource.active = true;

    $ctrl.data.resources.push(resource);
    change(resource);

    $ctrl.ui.refresh();
  }

  function tooglePanel () {
    $ctrl.panel.open = !$ctrl.panel.open;
    $ctrl.ui.refresh();

    $timeout($ctrl.ui.refresh, 100);

    // $cookies.put('dataEditor-open', $ctrl.panel.open);
  }
}
