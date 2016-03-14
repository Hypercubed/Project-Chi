/* global angular */

const moduleName = 'svgDownloadDropdown';

export default moduleName;

angular.module(moduleName, [])
.directive('svgDownloadDropdown', () => {
  return {
    link: (scope, element, attr) => {
      const sAttr = attr.svgDownloadDropdown.split(/\sin\s/);

      // var key = !attr.svgDownloadDropdown
      //  ? 'svgList'
      //  : sAttr[0];

      getSVGs();

      element.find('.dropdown-toggle').on('click', () => {
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
  };
});
