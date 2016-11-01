import d3 from 'd3';

import './network.less!';
import 'd3-tip/examples/example-styles.css!';

import threeChart from './network.three-chart';
// import d3Chart from './network.d3-chart';
import d3v4Chart from './network.d3v4-chart';
import {v3force, v4force} from './network.d3-force';

const chartConstructors = {
  // 'd3 v3': d3Chart,
  SVG: d3v4Chart,
  WebGL: threeChart
};

const layoutConstructors = {
  'd3-force v3': v3force,
  'd3-force v4': v4force
};

function controller () {
  const $ctrl = this;

  let chart;

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableOpen: true,
      enableSvgDownload: false,
      enablePngDownload: false,
      onChange: $onInit
    },
    charts: Object.keys(chartConstructors),
    layouts: Object.keys(layoutConstructors),
    selectedChart: 'SVG',
    selectedLayout: 'd3-force v4',
    filter: {},
    $onInit,
    applyFilter,
    makeChart
  });

  function $onInit () {
    $ctrl.data = processData($ctrl.dataPackage.resources[0].data);
    $ctrl.names = $ctrl.data.nodes.map(d => d.name);
    makeChart();
  }

  function applyFilter (filter) {
    let fn = d => {
      d.visible = true;
    };

    if (Array.isArray(filter.name) && filter.name.length > 0) {
      const names = filter.name.map(d => d.toLowerCase());
      fn = d => {
        const name = d.name.toLowerCase();
        d.visible = names.some(d => name.indexOf(d) > -1);
      };
    }

    $ctrl.data.nodes.forEach(fn);
    makeChart();
  }

  function processData (data) {
    const nodes = data.nodes.map((d, id) => {
      return {
        ...d,
        id,
        outdegree: 0,
        indegree: 0,
        visible: true
      };
    });

    const links = data.links.map(d => {
      const source = nodes[d.source];
      const target = nodes[d.target];

      source.outdegree++;
      source.degree++;

      target.indegree++;
      target.degree++;

      return {
        ...d,
        source: nodes[d.source],
        target: nodes[d.target]
      };
    });

    return {
      nodes,
      links
    };
  }

  function makeChart () {
    chart = chartConstructors[$ctrl.selectedChart]({
      layout: layoutConstructors[$ctrl.selectedLayout]({})
    });
    $ctrl.editorOptions.enableSvgDownload = $ctrl.selectedChart !== 'WebGL';
    draw();
  }

  function draw () {
    const container = d3.select('#_network__chart');

    container.selectAll('div').remove();

    const divs = container
      .selectAll('div')
      .data([$ctrl.data]);

    divs.enter().append('div');

    divs.exit().remove();

    divs.call(chart);
  }
}

export default {
  controller,
  templateUrl: 'components/examples/network/network.template.html',
  bindings: {
    dataPackage: '<package'
  }
};
