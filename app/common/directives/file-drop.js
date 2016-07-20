/* global FileReader, Blob */

import angular from 'angular';

import dp from 'common/services/datapackage/datapackage';

// import mime from 'common/services/datapackage/mime';

const module = angular.module('projectX.fileDrop', [])
.directive('fileDropzone', ['$window', function ($window) {
  return {
    restrict: 'A',
    scope: {
      file: '=',
      fileName: '=',
      dropped: '&'
    },
    link: (scope, element, attrs) => {
      const validMimeTypes = attrs.fileDropzone;

      function processDragOverOrEnter (event) {
        // console.log('processDragOverOrEnter');
        if (event !== null) {
          event.preventDefault();
        }
        element.addClass('hover');
        (event.dataTransfer || event.originalEvent.dataTransfer).effectAllowed = 'copy';
        return false;
      }

      function processDragLeave (event) {
        // console.log('processDragExit');
        if (event !== null) {
          event.preventDefault();
        }
        element.removeClass('hover');
        return false;
      }

      function checkSize (size) {
        const _ref = attrs.maxFileSize;
        if (((_ref) === undefined || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        }
        $window.alert(`File must be smaller than ${attrs.maxFileSize} MB`);
        return false;
      }

      function isTypeValid (type) {
        if ((validMimeTypes === undefined || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
          return true;
        }
        $window.alert(`Invalid file type ${type}.  File must be one of following types ${validMimeTypes}`);
        return false;
      }

      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      element.bind('dragleave', processDragLeave);

      function processDropFile (file) {
        const reader = new FileReader();
        reader.onload = function (evt) {
          file.content = evt.target.result;
          const type = dp.processor.mime.lookup(file.name);
          if (checkSize(file.size) && isTypeValid(type)) {
            return scope.$apply(() => {
              scope.dropped({file});
            });
          }
        };
        reader.readAsText(file);
      }

      return element.bind('drop', event => {
        if (event !== null) {
          event.preventDefault();
        }

        element.removeClass('hover');

        const files = (event.dataTransfer || event.originalEvent.dataTransfer).files;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          processDropFile(file);
        }

        return false;
      });
    }
  };
}]);

export default module.name;
