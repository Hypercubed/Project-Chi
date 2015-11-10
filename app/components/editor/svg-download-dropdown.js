/* global angular */

var moduleName = 'svgDownloadDropdown';

export default moduleName;

angular.module(moduleName, [])
.directive('svgDownloadDropdown', function () {
  return {
    link: function (scope, element, attr) {
      var sAttr = attr.svgDownloadDropdown.split(/\sin\s/);

      // var key = !attr.svgDownloadDropdown
      //  ? 'svgList'
      //  : sAttr[0];

      var el = !attr.svgDownloadDropdown
        ? element.parent
        : angular.element(document.querySelector(sAttr[1]));

      getSVGs();

      element.find('button').on('click', function () {
        scope.$apply(function () {
          getSVGs();
        });
      });

      function getSVGs () {
        var svgs = el.find('svg');
        var ids = [];

        angular.forEach(svgs, function (svg, d) {
          var elm = angular.element(svg);
          var o = {};
          o.id = elm.attr('id') || 'svg-' + d;
          o.title = elm.attr('title') || o.id;
          elm.attr(o);
          ids.push(o);
        });
        scope[sAttr[0]] = ids;
      }
    }
  };
});
