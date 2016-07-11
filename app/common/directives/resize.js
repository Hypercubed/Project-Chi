import angular from 'angular';

const moduleName = 'projectX.onResize';

export default moduleName;

angular
  .module(moduleName, [])
  .directive('onResize', onResize);

onResize.$inject = ['$window', '$timeout'];
function onResize ($window, $timeout) {
  return {
    scope: {
      onResize: '&'
    },
    link: scope => {
      let timeout = null;
      function debounceRedraw () {
        if (timeout) {
          $timeout.cancel(timeout);
        }
        timeout = $timeout(() => {
          scope.onResize();
        }, 500);
      }

      function resize () {
        scope.onResize();
      }

      angular.element($window).on('resize', debounceRedraw);
      if ('matchMedia' in window) {
        window.matchMedia('print').addListener(resize);
      }

      scope.$on('$destroy', () => {
        angular.element($window).off('resize', debounceRedraw);
        if ('matchMedia' in window) {
          window.matchMedia('print').removeListener(resize);
        }
      });
    }
  };
}
