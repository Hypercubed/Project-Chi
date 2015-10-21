

var moduleName='svgDownloadDropdown';

export default moduleName;

angular.module(moduleName, [])
.directive('svgDownloadDropdown', function() {
  return {
    link: function (scope, element, attr) {
			var sAttr = attr.svgDownloadDropdown.split(/\sin\s/);

			var key = !!attr.svgDownloadDropdown ?
				sAttr[0] :
				'svgList';

			var el = !!attr.svgDownloadDropdown ?
				angular.element(document.querySelector(sAttr[1])) :
				element.parent;

			getSVGs();

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
				scope[sAttr[0]] = ids;
			}

		}
  };
});
