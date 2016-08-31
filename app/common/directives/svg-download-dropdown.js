/* global angular */
import 'angular-downloadsvg-directive';

const module = angular
  .module('svgDownloadDropdown', ['hc.downloader'])
  .directive('svgDownloadDropdown', () => ({link}))
  .run(['$rootScope', 'cfpLoadingBar', function ($rootScope, cfpLoadingBar) {
    $rootScope.$on('$svgSaver:start', () => {
      console.log('$svgSaver:start');
      cfpLoadingBar.start();
    });

    $rootScope.$on('$svgSaver:end', () => {
      cfpLoadingBar.complete();
    });

    $rootScope.$on('$svgSaver:error', () => {
      cfpLoadingBar.complete();
    });
  }]);

function link (scope, element, attr) {
  const sAttr = attr.svgDownloadDropdown.split(/\sin\s/);

  // var key = !attr.svgDownloadDropdown
  //  ? 'svgList'
  //  : sAttr[0];

  getSVGs();

  element.on('click', () => {
    scope.$apply(() => {
      getSVGs();
    });
  });

  function getSVGs () {
    const el = attr.svgDownloadDropdown ?
      angular.element(document.querySelector(sAttr[1])) :
      element.parent;

    const svgs = el.find('svg');
    const ids = [];

    angular.forEach(svgs, (svg, d) => {
      const elm = angular.element(svg);
      const id = elm.attr('id') || `svg-${d}`;
      const title = elm.attr('title') || id;

      const o = {id, title};
      elm.attr(o);
      ids.push(o);
    });
    scope[sAttr[0]] = ids;
  }
}

export default module.name;
