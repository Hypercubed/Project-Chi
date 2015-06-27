/* global angular */

import 'codemirror/lib/codemirror';

import 'codemirror/lib/codemirror.css!';
import 'components/editor/editor.css!';

import saveAs from 'FileSaver';

// canExpand
// canEdit
// maxResources
// table view

angular.module('myApp.dataEditor',['myApp.dataService'])
.directive('datapackageEdit', ['$rootScope', '$window', '$cookies', '$timeout', 'mimeType', 'dataService',
                       function($rootScope,   $window,   $cookies,   $timeout, mimeType, dataService) {
  return {
    scope: {
      dataPackage: '=model',
      onChange: '&',
      readOnly: '='  // rename
    },
    transclude: true,
    templateUrl: 'components/editor/editor.html',
    link: function link(scope) {

      var hasPackage = !!scope.dataPackage;

      scope.panel = {};
      scope.panel.open = hasPackage;

      scope.change = change;
      scope._delete = _delete;
      scope.rename = rename;
      scope.newFile = newFile;
      scope.dropped = dropped;
      scope.download = download;
      scope.tooglePanel = tooglePanel;
      scope.play = play;
      scope.types = ['text/plain','text/csv','text/tab-separated-values','application/json'];

      scope.canOpen = hasPackage && !scope.readOnly;
      scope.canDownload = hasPackage && scope.dataPackage.resources.length > 0;

      if (scope.canDownload) {
        scope.dataPackage.resources[0].active = true;
      }

      scope.ui = {
        refresh: function() {
          scope.ui.count++;
        },
        count: 0,
        codemirrorLoaded: function(cm) {

          $timeout(function() {
            cm.refresh();
            scope.ui.refresh();
          }, 100);

        }
      }

      $timeout(function() {
        scope.panel.open = !scope.readOnly && hasPackage ? $cookies.get('dataEditor-open') !== 'false' : false;
        scope.ui.refresh();
      });

      function refresh(file) {
        dataService.processResource(file);
      }

      function play() {
        scope.dataPackage.readme = null;
        scope.canOpen = true;
        tooglePanel();
      }

      function change(file) {
        refresh(file);
        scope.onChange();
      }

      function _delete(i) {
        //console.log(i);
        if (i > -1) {
          scope.dataPackage.resources.splice(i,1);
          scope.onChange();
          console.log('delete',scope.dataPackage.resources);
        }

      }

      function rename(file) {
        if (!file.path) { return; }
        file.name = file.path;
        file.mediatype = mimeType(file.path);
        change(file);
      }

      function newFile(filename) {

        filename = filename || 'new.txt';

        var resource = {
          name: filename,
          path: filename,
          mediatype: mimeType(filename),
          content: ''
        };

        resource.active = true;

        var i = scope.dataPackage.resources.push(resource);
        scope.dataPackage.resources[i-1].active = true;

        change(resource);

        $timeout(scope.ui.Refresh, 100);

        return false;
      }

      function dropped(file) {
        var resource = {
          path: file.name,
          mediatype: mimeType(file.name),
          content: file.content || ''
        };

        resource.active = true;

        scope.dataPackage.resources.push(resource);
        change(resource);

        scope.ui.refresh();
      }

      function download(file) {
        var type = (file.type || 'text/plain') + ';charset=utf-8';
        var filename = file.name || 'download.txt';

        var blob = new Blob([file.content], {type: type});
        saveAs(blob, filename);
      };

      function tooglePanel() {
        scope.panel.open = !scope.panel.open;
        scope.ui.refresh();

        $timeout(scope.ui.Refresh, 100);

        $cookies.put('dataEditor-open', scope.panel.open);
      };

    }
  };
}])
.directive('svgDownloadDropdown', function() {
  return {
    transclude: true,
    templateUrl: 'components/editor/svg-download-list-template.html',
    scope: {},
    link: function (scope, element, attr) {

      scope.svgList = [];
      scope.getSvgs = getSVGs;

      var el = !!attr.svgDownloadDropdown ?
        angular.element(document.querySelector(attr.svgDownloadDropdown)) :
        element.parent;

      element.find('button').on('click', function() {

        scope.$apply(function() {
          getSVGs();
        });

      });

      function getSVGs() {

        var svgs = el.find('svg'), ids = [];

        angular.forEach(svgs, function(svg, d) {
          var elm = angular.element(svg);

          var o = {};

          o.id = elm.attr('id') || 'svg-'+d;
          o.title = elm.attr('title') || o.id;

          elm.attr(o);

          ids.push(o);
        });

        scope.svgList = ids;

      }

    }
  };

})
.directive('fileDropzone', ['$window', 'mimeType', function($window, mimeType) {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '=',
      dropped: '&'
    },
    link: function(scope, element, attrs) {
      var validMimeTypes = attrs.fileDropzone;

      function processDragOverOrEnter(event) {
        //console.log('processDragOverOrEnter');
        if (event !== null) {
          event.preventDefault();
        }
        element.addClass('hover');
        (event.dataTransfer || event.originalEvent.dataTransfer).effectAllowed = 'copy';
        return false;
      }

      function processDragLeave(event) {
        //console.log('processDragExit');
        if (event !== null) {
          event.preventDefault();
        }
        element.removeClass('hover');
        return false;
      }

      function checkSize(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          $window.alert('File must be smaller than ' + attrs.maxFileSize + ' MB');
          return false;
        }
      }

      function isTypeValid(type) {
        if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        } else {
          $window.alert('Invalid file type '+type+'.  File must be one of following types ' + validMimeTypes);
          return false;
        }
      }

      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      element.bind('dragleave', processDragLeave);

      function processDropFile(file) {
        var reader = new FileReader();
        reader.onload = function(evt) {
          file.content = evt.target.result;
          var type = mimeType(file.name);
          if (checkSize(file.size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.dropped({file: file});
            });
          }
        };
        reader.readAsText(file);
      }

      return element.bind('drop', function(event) {
        if (event !== null) {
          event.preventDefault();
        }

        element.removeClass('hover');

        var files = (event.dataTransfer || event.originalEvent.dataTransfer).files;


        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          processDropFile(file);
        }

        return false;
      });
    }
  };
}]);
