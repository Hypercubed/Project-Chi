import angular from 'angular';

const module = angular
  .module(name, [])
  .provider('dynamicTitle', DynamicTitleProvider)
  .run(setupRouteChange);

export default module.name;

setupRouteChange.$inject = ['$rootScope', 'dynamicTitle'];
function setupRouteChange ($rootScope, dynamicTitle) {
  $rootScope.$on('$routeChangeSuccess', (event, current) => {
    return dynamicTitle.fromState(current);
  });
}

DynamicTitleProvider.$inject = [];
function DynamicTitleProvider () {
  const configuration = {
    defaultTitle: document.title || 'Project-χ'
  };

  this.configure = function (value) {
    angular.extend(configuration, value);
  };

  this.$get = DynamicTitle;

  DynamicTitle.$inject = ['$document', '$log'];
  function DynamicTitle ($document, $log) {
    return {
      set,
      fromState ($state) {
        let value = null;
        if ($state.$$route && $state.$$route.title) {
          value = (typeof $state.$$route.title === 'function') ?
            $state.$$route.title($state.params) :
            $state.$$route.title;
        }
        set(value);
      }
    };

    function set (title) {
      title = title || configuration.defaultTitle;
      $log.debug('title set to', title);
      $document[0].title = title;
    }
  }
}
