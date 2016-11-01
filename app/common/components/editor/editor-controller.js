/* global FileReader, Blob */
/* eslint max-params: 0 */
import {isObservable} from 'mobx';

controller.$inject = ['$scope', '$cookies', '$timeout', '$log', 'growl', 'dataService'];
export default function controller ($scope, $cookies, $timeout, $log, growl, dataservice) {
  const $ctrl = this;
  const hasOptions = Boolean($ctrl.options);
  const hasPackage = hasOptions && Boolean($ctrl.options.data);
  const hasResources = hasPackage && $ctrl.options.data.resources.length > 0;

  const isSafari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
  const isIE = typeof window.navigator.msSaveBlob !== 'undefined';

  const enableFileDownload = hasPackage && hasResources;

  $scope.$ctrl.options = $ctrl.options || {};

  // user config defaults
  Object.assign($ctrl.options, {
    enableOpen: hasPackage,
    enableFileDownload,
    enableSvgDownload: true,
    enablePngDownload: !isSafari && !isIE,
    enableAdd: true,
    enableDrop: false,
    enableProtected: false,
    types: Object.keys(dataservice.translators),
    defaultFormat: hasResources ? $ctrl.options.data.resources[0].format : 'txt',
    defaultSchema: hasResources ? $ctrl.options.data.resources[0].schema : undefined,
    onChange: () => {},
    ...$ctrl.options
  });

  return Object.assign($ctrl, {
    // internal state
    activeTab: 0,
    resources: hasResources ? $ctrl.options.data.resources.slice() : [],
    panel: {
      open: false
    },

    // user config defaults
    /* enableOpen: hasPackage,
    enableFileDownload,
    enableSvgDownload: true,
    enablePngDownload: !isSafari && !isIE,
    enableAdd: true,
    enableDrop: false,
    enableProtected: false,
    types: Object.keys(dataservice.translators),
    defaultFormat: hasResources ? $ctrl.options.data.resources[0].format : 'txt',
    defaultSchema: hasResources ? $ctrl.options.data.resources[0].schema : undefined,

    // user config event
    onChange: () => {},  // called when datapackage updates
    */

    // methods
    // change: updateResource,
    remove: removeResourceByIndex,
    // rename: resourceRenamed,
    newFile: addResource,
    dropped: fileDropped,
    droppedOver: fileDroppedOver,
    submit,  // push changes to data package
    cancel,  // cancel changes, refresh from data package
    tooglePanel,
    play,

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
    }

    // svgsFrom: '#chart' // TODO
  });

  function cancel (form) {
    $log.debug('cancel');
    form.$rollbackViewValue();
    if (hasPackage) {
      $ctrl.resources = $ctrl.options.data.resources.slice();
    } else {
      $ctrl.resources = [];
    }
    form.$setPristine();
  }

  function submit (form) {
    if (form.$valid) {
      $log.debug('submit');
      if (hasPackage) {
        if (isObservable($ctrl.options.data.resources)) {
          $ctrl.options.data.replaceResources($ctrl.resources);
        } else {
          $ctrl.options.data.resources = $ctrl.resources;
          $ctrl.options.data.$resourcesByName = $ctrl.options.data.resourcesByName = dataservice.index($ctrl.options.data);
        }
      }
      $timeout(() => {
        // console.log($ctrl.options.onChange);
        $ctrl.options.onChange();
      });
    }
  }

  function createNewResource (name, content = '') {
    name = name || `new.${$ctrl.options.defaultFormat}`;
    return {
      path: name,
      name,
      mediatype: dataservice.mime.lookup(name),
      content,
      schema: $ctrl.options.defaultSchema
    };
  }

  function fileDroppedOver ($index, file) {
    $log.debug('fileDroppedOver', $index, file);
    const resource = createNewResource(file.name, file.content);
    $ctrl.activeTab = $index;
    $ctrl.resources[$index] = resource;
    $ctrl.ui.refresh();
  }

  function fileDropped (file) {
    $log.debug('fileDropped', file);
    addResource(file.name, file.content);
  }

  function addResource (name, content = '') {
    $log.debug('addResource', name, content);
    const resource = createNewResource(name, content);
    $ctrl.resources.push(resource);
    // updateResource(resource);
    // console.log($ctrl.resources);
    $timeout(() => {
      $ctrl.ui.refresh();
      $ctrl.activeTab = $ctrl.resources.length - 1;
    });
    return false;
  }

  function play () {
    // TODO: redo this... hide readme, don't delete it
    /* if ($ctrl.data && $ctrl.data.readme) {
      $ctrl.data.readme = null;
    } */
    tooglePanel();
  }

  function removeResourceByIndex (i) {
    if (i > -1) {
      $ctrl.resources.splice(i, 1);
    }
  }

  function tooglePanel () {
    $ctrl.panel.open = !$ctrl.panel.open;
    $ctrl.ui.refresh();

    $timeout($ctrl.ui.refresh, 100);
  }
}
