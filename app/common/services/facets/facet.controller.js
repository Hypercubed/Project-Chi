import d3 from 'd3';

// import template from './facet-template.html!text';
import './facet.css!';
import {readableName} from './facet.utils';

controller.$inject = ['$scope', '$log'];
function controller ($scope, $log) {
  const $ctrl = this;

  $ctrl.facet.displayName = $ctrl.facet.displayName || readableName($ctrl.facet.key);

  const minLimit = 5;
  const maxLimit = 100;

  const scale = d3.scale.linear()
    .range([0, 100]);

  $scope.$watch(() => $ctrl.facet.collapsed, c => {
    if (!c) {
      $log.debug('opened', $ctrl.facet.key);
      setupFacet();
    }
  });

  return Object.assign($ctrl, {
    minLimit,
    maxLimit,
    limit: minLimit,
    size: 0,
    list: [],
    scale,
    toggle,
    toggleLimit,
    exists,
    clear
  });

  function setupFacet () {
    const facet = $ctrl.facet;

    if (!facet.query) {
      if (facet.universe) {
        loadQuery();
      } else {
        const listener = $scope.$watch(() => facet.universe, u => {
          if (u) {
            listener();  // remove listener
            $log.debug('facet.universe defined', facet.key);
            loadQuery();
          }
        });
      }
    }
  }

  function loadQuery () {
    const facet = $ctrl.facet;

    facet.displayName = facet.displayName || readableName(facet.key);
    const sortBy = facet.sortBy || function (a, b) {
      return b.value.count - a.value.count;
    };

    const u = facet.universe;
    const start = new Date();

    $log.debug('start query', facet.key);
    u.query({
      groupBy: facet.groupBy || facet.key,
      type: facet.type || 'string'
    })
    .then(q => {
      $log.debug('done query', facet.key, new Date() - start, 'ms');
      facet.query = q;
      $ctrl.list = q.data.slice().sort(sortBy);
      setScale();
      u.onFilter(setScale);
    })
    .catch(console.error.bind(console));  // eslint-disable-line no-console
  }

  function setScale () {
    if ($ctrl.list) {
      $scope.$applyAsync(() => {
        const max = d3.max($ctrl.list, d => d.value.count);
        scale.domain([0, max]);
      });
    }
  }

  function clear () {
    $ctrl.facets.filter($ctrl.facet.key);
  }

  function exists (item) {
    const filter = $ctrl.facet.universe
      .filters[$ctrl.facet.key];
    if (filter) {
      if (Array.isArray(filter.value)) {
        return filter.value.indexOf(item) > -1;
      }
      return filter.value === item;
    }
    return false;
  }

  function toggle (item) {
    $ctrl.facet.universe
      .filter($ctrl.facet.key, item)
      .catch(console.error.bind(console)); // eslint-disable-line no-console
  }

  function toggleLimit () {
    $ctrl.limit = ($ctrl.limit === $ctrl.minLimit) ? $ctrl.maxLimit : $ctrl.minLimit;
  }
}

export default controller;
