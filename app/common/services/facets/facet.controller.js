import d3 from 'd3';

// import template from './facet-template.html!text';
import './facet.css!';
import {readableName} from './facet.utils';

controller.$inject = ['$scope', '$log'];
function controller ($scope, $log) {
  const $ctrl = this;
  const facet = $ctrl.facet;

  facet.displayName = facet.displayName || readableName(facet.key);
  const sortBy = facet.sortBy || function (a, b) {
    return b.value.count - a.value.count;
  };

  const minLimit = 5;
  const maxLimit = 100;

  const scale = d3.scale.linear()
    .range([0, 100]);

  const listener = $scope.$watch(() => facet.universe, u => {
    if (u) {
      listener();  // remove listener

      $log.debug('facet.universe defined', facet.key);

      u.onFilter(setScale);

      u.query({
        groupBy: facet.groupBy || facet.key,
        type: facet.type || 'string'
      })
      .then(q => {
        facet.query = q;
        $ctrl.list = q.data.slice().sort(sortBy);
        setScale();
      })
      .catch(console.error.bind(console));
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

  function setScale () {
    if ($ctrl.list) {
      $scope.$applyAsync(() => {
        const max = d3.max($ctrl.list, d => d.value.count);
        scale.domain([0, max]);
      });
    }
  }

  function clear () {
    $ctrl.facets.filter(facet.key);
  }

  function exists (item) {
    const filter = $ctrl.facet.universe
      .filters[facet.key];
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
      .filter(facet.key, item)
      .catch(console.error.bind(console));
  }

  function toggleLimit () {
    $ctrl.limit = ($ctrl.limit === $ctrl.minLimit) ? $ctrl.maxLimit : $ctrl.minLimit;
  }
}

export default controller;
