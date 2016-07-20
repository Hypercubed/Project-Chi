/* global FileReader, Blob */

import mime from 'common/services/datapackage/mime';
import {processByType, processors} from 'common/services/datapackage/processors';

controller.$inject = ['$cookies', '$timeout', '$log', 'dataService'];
export default function controller ($cookies, $timeout, $log, dataService) {
  const $ctrl = this;
  const hasOptions = Boolean($ctrl.options);
  const hasPackage = hasOptions && Boolean($ctrl.options.data);

  const isSafari = /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
  const isIE = typeof window.navigator.msSaveBlob !== 'undefined';

  const enableFileDownload = hasPackage && $ctrl.options.data.resources.length > 0;

  return Object.assign($ctrl, {
    // "internal"
    activeTab: 0,
    resources: hasPackage ? $ctrl.options.data.resources.slice() : [],
    panel: {
      open: false
    },
    change: resourceChanged,
    remove: removeResourceByIndex,
    rename: resourceRenamed,
    newFile: addResource,
    dropped: fileDropped,
    droppedOver: fileDroppedOver,
    submit,
    cancel,
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
    },

    // user config event
    onChange: () => {},

    // user config defaults
    enableOpen: hasPackage,
    enableFileDownload,
    enableSvgDownload: true,
    enablePngDownload: !isSafari && !isIE,
    enableAdd: true,
    enableDrop: false,
    enableProtected: false,
    types: Object.keys(processors),
    defaultFormat: hasPackage ? $ctrl.options.data.resources[0].format : 'txt',
    defaultSchema: hasPackage ? $ctrl.options.data.resources[0].schema : undefined

    // svgsFrom: '#chart' // TODO
  }, this.options);

  function cancel (form) {
    $log.debug('cancel');
    form.$rollbackViewValue();
    if (hasPackage) {
      $ctrl.resources = $ctrl.options.data.resources.slice();
    }
  }

  function submit () {
    $log.debug('submit');
    if (hasPackage) {
      $ctrl.options.data.resources = $ctrl.resources;
      dataService.reindexPackage($ctrl.options.data);
    }
    $timeout(() => {
      $ctrl.onChange();
    });
  }

  function createNewResource (name, content = '') {
    name = name || `new.${$ctrl.defaultFormat}`;
    return {
      path: name,
      name,
      mediatype: mime.lookup(name),
      content,
      schema: $ctrl.defaultSchema
    };
  }

  function fileDroppedOver ($index, file) {
    $log.debug('fileDroppedOver', $index, file);
    const resource = createNewResource(file.name, file.content);
    $ctrl.activeTab = $index;
    $ctrl.resources.splice($index, 1, resource);
    resourceChanged(resource);
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
    resourceChanged(resource);
    $timeout(() => {
      $ctrl.ui.refresh();
      $ctrl.activeTab = $ctrl.resources.length - 1;
    });
    return false;
  }

  function play () {
    if ($ctrl.data && $ctrl.data.readme) {
      $ctrl.data.readme = null;
    }
    tooglePanel();
  }

  function resourceChanged (resource) {
    if (resource.schema && typeof resource.schema === 'string') {  // Move this
      resource.schema = $ctrl.data.schemas[resource.schema];
    }
    processByType(resource);
  }

  function removeResourceByIndex (i) {
    if (i > -1) {
      $ctrl.resources.splice(i, 1);
    }
  }

  function resourceRenamed (resource) {
    if (!resource.name) {
      return;
    }
    resource.path = resource.name;
    resourceChanged(resource);
  }

  function tooglePanel () {
    $ctrl.panel.open = !$ctrl.panel.open;
    $ctrl.ui.refresh();

    $timeout($ctrl.ui.refresh, 100);
  }
}
