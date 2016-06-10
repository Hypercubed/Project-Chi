import angular from 'angular';

const moduleName = 'projectX.activePath';

export default moduleName;

angular
  .module(moduleName, [])
  .directive('activePath', activePathDirective);

activePathDirective.$inject = ['$log', '$location'];
function activePathDirective ($log, $location) {
  return {
    link: function postLink (scope, element, attrs) {
      const re = new RegExp(attrs.activePath);
      scope.$watch(() => $location.path(), value => {
        if (re.test(value)) {
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }
  };
}
