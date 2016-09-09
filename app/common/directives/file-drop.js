/* global FileReader, Blob */

import angular from 'angular';

import dp from 'common/services/datapackage/datapackage';

fileReadService.$inject = ['$log', 'growl'];
export function fileReadService ($log, growl) {
  const service = {
    processFile (file, scope) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        file.content = evt.target.result;
        const type = file.type || dp.mime.lookup(file.name);
        if (service.checkSize(file.size, scope) && service.checkType(type, scope)) {
          return scope.$apply(() => {
            scope.onReadFile({file});
          });
        }
      };
      reader.readAsText(file);
    },
    checkSize (size, opts) {
      const _ref = opts.maxFileSize;
      if (((_ref) === undefined || _ref === '') || (size / 1024) / 1024 < opts.maxFileSize) {
        return true;
      }
      growl.error(`File must be smaller than ${opts.maxFileSize} MB`);
      return false;
    },
    checkType (type, opts) {
      if ((opts.validMimeTypes === undefined || opts.validMimeTypes === '') || opts.validMimeTypes.indexOf(type) > -1) {
        return true;
      }
      growl.error(`Invalid file type ${type}.  File must be one of following types ${opts.validMimeTypes}`);
      return false;
    }
  };

  return service;
}

onReadFileDirective.$inject = ['fileRead'];
function onReadFileDirective (fileRead) {
  return {
    restrict: 'A',
    scope: {
      onReadFile: '&',
      validMimeTypes: '@accept',
      maxFileSize: '@'
    },
    link: (scope, element) => {
      return element.on('change', event => {
        if (event !== null) {
          event.preventDefault();
        }
        const files = (event.srcElement || event.target).files;
        for (let i = 0; i < files.length; i++) {
          fileRead.processFile(files[i], scope);
        }
      });
    }
  };
}

fileDropzoneDirective.$inject = ['fileRead'];
function fileDropzoneDirective (fileRead) {
  return {
    restrict: 'A',
    scope: {
      onReadFile: '&dropped',
      validMimeTypes: '@fileDropzone',
      maxFileSize: '@'
    },
    link: (scope, element) => {
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      element.bind('dragleave', processDragLeave);

      return element.bind('drop', event => {
        if (event !== null) {
          event.preventDefault();
        }

        element.removeClass('hover');

        const files = (event.dataTransfer || event.originalEvent.dataTransfer).files;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          fileRead.processFile(file, scope);
        }

        return false;
      });

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
    }
  };
}

export default angular
  .module('projectX.fileDrop', ['angular-growl'])
  .service('fileRead', fileReadService)
  .directive('onReadFile', onReadFileDirective)
  .directive('fileDropzone', fileDropzoneDirective)
  .name;
