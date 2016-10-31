import angular from 'angular';

const activePath = angular
  .module('projectX.activePath', [])
  .directive('activePath', activePathDirective);

export default activePath.name;

activePathDirective.$inject = ['$log', '$location'];
function activePathDirective ($log, $location) {
  return {
    link (scope, element, attrs) {
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
