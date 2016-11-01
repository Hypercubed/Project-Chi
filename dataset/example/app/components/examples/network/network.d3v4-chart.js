import * as d3 from 'd3-selection';
import {scaleOrdinal, schemeCategory20} from 'd3-scale';
import d3Tip from 'd3-tip';

import {v4force} from './network.d3-force';

// Based on Force-Directed Graph by [M. Bostock](https://bl.ocks.org/mbostock/4062045).
export default function Network (opts) {
  opts = opts || {};

  const margin = opts.margin || {top: 0, right: 0, bottom: 0, left: 0};
  let width = opts.width || 'auto';
  let height = opts.height || 'auto';
  const title = opts.title || 'Network';
  const layout = opts.layout || v4force({});
  const radius = opts.radius || 5;

  const color = scaleOrdinal(schemeCategory20);

  const tip = d3Tip()
    .attr('class', 'd3-tip animate')
    .offset([-10, 0])
    .html(d => `${d.name}`);

  function chart (selection) {
    selection.each(function (graph) {
      const container = d3.select(this);

      if (typeof width !== 'number') {
        width = this.parentNode.clientWidth - margin.left - margin.right;
        if (typeof width !== 'number' || width < 500) {
          width = 500;
        }
      }

      if (typeof height !== 'number') {
        height = 600 / 960 * width;
      }

      const svg = container.selectAll('svg')
        .data([graph])
        .enter()
        .append('svg')
          .attr('title', title)
          .attr('width', width)
          .attr('height', height);

      svg.call(tip);

      const nodeData = graph.nodes; // .filter(d => d.visible);
      const linkData = graph.links; // .filter(d => d.target.visible && d.source.visible);

      layout
        .size([width, height])
        .nodes(nodeData)
        .links(linkData)
        .start();

      const link = svg.selectAll('.link')
          .data(linkData)
        .enter().append('line')
          .attr('class', 'link')
          .style('opacity', d => (d.target.visible && d.source.visible) ? 1 : 0.1)
          .style('stroke-width', d => Math.sqrt(d.value));

      const node = svg.selectAll('.node')
          .data(nodeData)
        .enter().append('circle')
          .attr('class', 'node')
          .classed('fixed', d => d.fixed)
          .attr('r', radius)
          .style('fill', d => color(d.group))
          .style('opacity', d => d.visible ? 1 : 0.2)
          .on('mouseover', tip.show)
          .on('mouseout', tip.hide)
          .on('dblclick', layout.fixed);

      node
        .call(layout.drag);

      node.append('title')
        .text(d => d.name);

      layout.on('tick', () => {
        link.attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node.attr('cx', d => d.x)
            .attr('cy', d => d.y);
      });
    });
  }

  return chart;
}
