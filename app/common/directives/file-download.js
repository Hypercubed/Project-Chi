/* global FileReader, Blob */

import angular from 'angular';

import saveAs from 'FileSaver/FileSaver.js';
import 'blobjs/Blob.js';

const module = angular.module('projectX.fileDownload', [])
  .directive('fileDownload', () => {
    return {
      scope: {
        file: '=fileDownload'
      },
      link: (scope, element /* , attrs */) => {
        function download (file) {
          const mime = file.type || 'text/plain';
          const type = `${mime};charset=utf-8`;
          const filename = file.name || 'download.txt';

          const blob = new Blob([file.content], {type});
          saveAs(blob, filename);  // shim this
        }

        element.bind('click', () => {
          download(scope.file);
        });
      }
    };
  });

export default module.name;
