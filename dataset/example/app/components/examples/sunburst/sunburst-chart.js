import {hierarchy, partition} from 'd3-hierarchy';
import {scaleOrdinal, scaleLinear} from 'd3-scale';
import {select, selectAll} from 'd3-selection';
import {arc} from 'd3-shape';
import {transition} from 'd3-transition';

// test d3 version and map d3v4
let d4 = {};
if (d3.version) { // d3v3.x present as global
  d4 = {
    hierarchy, partition,
    scaleOrdinal, scaleLinear,
    select, selectAll,
    arc,
    transition
  };
} else { // d3v4 present as global
  d4 = d3;
}

export default function Sun () {
  function sun (div, data) {
    // console.log('data', data);
    // VARS
    const width = div.offsetWidth;
    const height = div.offsetHeight;
    const radius = Math.min(width, height) / 2;
    const color = d4.scaleOrdinal().range(['#330136', '#5e1742', '#962e40', '#c9463d', '#ff5e35']);
    // const formatPercent = d3.format('.0%');
    const x = d4.scaleLinear().range([0, 2 * Math.PI]);
    const y = d4.scaleLinear().range([0, radius]);
    // Arc calculation
    const arc = d4.arc()
      .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
      .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
      .innerRadius(d => Math.max(0, y(d.y0)))
      .outerRadius(d => Math.max(0, y(d.y1)));

    // LAYOUT
    // compute depth / height
    const root = d4.hierarchy(data);
    // copy the value from source
    root.descendants().forEach(node => {
      node.value = node.data.data.$area;
    });
    // compute coordinates
    d4.partition()(root);
    // console.log('root', root);

    // SVG
    const svg = d4.select(div).append('svg')
      .attr('title', 'sunburst')
      .attr('width', width)
      .attr('height', height);

    // group for visual elements
    const visual = svg.append('g').datum(root)
      .attr('transform', `translate(${width / 2},${height / 2})`)
      .classed('visual', true);

    // visual elements
    visual.selectAll('path')
    .data(root.descendants())
    .enter().append('path')
    .attr('class', (d, i) => 'v' + i)
    .attr('display', d => d.depth ? null : 'none') // hide inner ring
    .attr('d', d => arc(d))
    .style('stroke', '#fff')
    .style('fill', d => color(d.data.name.split('•')[0]))
    .style('fill-rule', 'evenodd');
    // .on('mouseover', function(d){ tip('show',d); })
    // .on('mousemove', function(d) { tip('move'); })
    // .on('mouseout', function(d){ tip('hide'); })
  } // end sun
  return sun;
}
