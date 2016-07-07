import d3 from 'd3';
import universe from 'universe';
import _ from 'lodash';

import {gridDefaults} from 'common/services/grid/grid.utils';

import barChart from './bar-chart';

const generatedColumns = {
  day: d => d3.time.format('%A')(d.date),
  hour: d => Number(d3.time.format('%H')(d.date)),
  dayOfWeek: d => d3.time.format('%A')(d.date),
  arrivalDelay: d => Math.floor(d.delay / 30) * 30,
  distances: d => Math.floor(d.distance / 100) * 100
};

const columnDefs = [
  {name: 'date', type: 'date', cellFilter: `date:'short'`},
  {
    name: 'delay',
    displayName: 'Arrival Delay',
    type: 'number',
    cellTemplate: `
      <div ng-class="{ early: COL_FIELD < 0}">
        {{grid.getCellValue(row, col)}} min
      </div>`
  },
  {
    name: 'distance',
    displayName: 'Distance',
    type: 'number',
    cellTemplate: `
      <div>
        {{grid.getCellValue(row, col)}} mi.
      </div>`
  },
  {name: 'origin'},
  {name: 'destination'}
];

controller.$inject = ['$scope', '$log', 'cfpLoadingBar'];
function controller ($scope, $log, cfpLoadingBar) {
  const $ctrl = this;

  const gridOpts = {
    ...gridDefaults,
    columnDefs,
    enableColumnResizing: true,
    enablePaginationControls: false,
    flatEntityAccess: true,
    enableFiltering: false,
    data: []
  };

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      onChange: _.debounce(process, 300)
    },
    gridOpts,
    clearAll () {
      cfpLoadingBar.start();
      $ctrl.universe.filterAll().then(() => {
        $ctrl.charts.forEach(chart => chart.method.clearBrush());
      });
    },
    raw: $ctrl.dataPackage.resources[0].data,
    $onInit () {
      $log.debug('onInit');
      process();
    }
  });

  function process () {
    cfpLoadingBar.start();
    const raw = $ctrl.raw = $ctrl.dataPackage.resources[0].data;

    $log.debug('processing', raw.length);

    raw.forEach((d, i) => {
      d.index = i;
      d.date = parseDate(d.date);
      d.delay = Number(d.delay);
      d.distance = Number(d.distance);
    });

    if ($ctrl.universe) {
      $ctrl.universe.clear();
      $ctrl.universe = null;
    }

    $ctrl.facets = [
      {key: 'dayOfWeek', displayName: 'Day of the Week'},
      {key: 'origin'},
      {key: 'destination'}
    ];

    universe(raw, {generatedColumns})
      .then(async service => {
        $ctrl.universe = service;
        $ctrl.universe.onFilter(update);

        await $ctrl.universe.column($ctrl.facets.map(d => d.key));

        $ctrl.facets.forEach(facet => {
          facet.universe = service;
        });

        await $ctrl.universe.column('index');  // main data list
        $ctrl.id = $ctrl.universe.column.find('index').dimension;

        await setup();
        update();

        $log.debug('universe setup done');
      })
      .catch(console.error.bind(console));
  }

  function update () {
    $scope.$applyAsync(() => {
      $ctrl.gridOpts.data = $ctrl.data = $ctrl.id.top(Infinity);
      renderAll();
    });
  }

  function setup () {
    const container = d3.select('#charts');

    container
      .selectAll('div')
      .remove();

    $ctrl.charts = [
      {groupBy: 'hour', displayName: 'Time of Day'},
      {groupBy: 'arrivalDelay', displayName: 'Arrival Delay (min.)'},
      {groupBy: 'distances', displayName: 'Distance (mi.)'}
    ];

    const p = $ctrl.charts.map(chart => {
      chart.element = container
        .append('div')
        .attr('class', 'col-md-4');

      const width = chart.element[0][0].clientWidth;
      chart.method = barChart()
        .width(width - 20)
        .title(chart.displayName);

      return $ctrl.universe.query(chart)
        .then(q => chart.element.datum(q));
    });

    return Promise.all(p);
  }

  function render (chart) {
    if (chart.element && chart.method) {
      chart.element
        .call(chart.method);
    }
  }

  function renderAll () {
    $ctrl.charts.forEach(render);
    cfpLoadingBar.complete();
  }

  function parseDate (d) {
    return new Date(2001,
        d.substring(0, 2) - 1,
        d.substring(2, 4),
        d.substring(4, 6),
        d.substring(6, 8));
  }
}

export default {
  controller,
  templateUrl: 'components/examples/universe/universe.html',
  bindings: {
    dataPackage: '<package'
  }
};
