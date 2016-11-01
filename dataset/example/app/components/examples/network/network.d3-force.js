import d3v3 from 'd3';
import * as d3 from 'd3-selection';
import {forceSimulation, forceManyBody, forceCenter, forceLink} from 'd3-force';
import {drag} from 'd3-drag';

function v3force () {
  const force = d3v3.layout.force()
    .charge(-120)
    .linkDistance(30);

  const nodeDrag = drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);

  const api = {
    nodes: chain(force.nodes),
    links: chain(force.links),
    drag: nodeDrag,
    fixed,
    on: chain(force.on),
    size: chain(force.size),
    start: chain(force.start)
  };

  return api;

  function chain (fn) {
    return function () {
      fn.apply(this, arguments);
      return api;
    };
  }

  function fixed (d) {
    d.fixed = !d.fixed;
    if (this !== null) {
      d3.select(this).classed('fixed', d.fixed);
    }
  }

  function dragstarted (d) {
    d = d3.event.subject || d;
    d.fixed |= 2;
  }

  function dragged (d) {
    d = d3.event.subject || d;
    d.px = d3.event.x;
    d.py = d3.event.y;
    force.resume();
  }

  function dragended (d) {
    d = d3.event.subject || d;
    d.fixed &= ~6;
  }
}

function v4force () {
  const link = forceLink();

  const simulation = forceSimulation()
    .force('charge', forceManyBody())
    .force('link', link);

  const nodeDrag = drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);

  const api = {
    nodes: chain(simulation.nodes.bind(simulation)),
    links: chain(link.links.bind(link)),
    drag: nodeDrag,
    fixed,
    on: chain(simulation.on),
    size: ([width, height]) => {
      simulation.force('center', forceCenter(width / 2, height / 2));
      return api;
    },
    start: chain(() => {})
  };

  return api;

  function chain (fn) {
    return function () {
      fn.apply(this, arguments);
      return api;
    };
  }

  function fixed (d) {
    d.fixed = !d.fixed;
    d.fx = d.fixed ? d.x : null;
    d.fy = d.fixed ? d.y : null;
    if (this !== null) {
      d3.select(this).classed('fixed', d.fixed);
    }
  }

  function dragstarted (d) {
    d = d3.event.subject || d;
    if (!d3.event.active) {
      simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged (d) {
    d = d3.event.subject || d;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended (d) {
    d = d3.event.subject || d;
    if (!d3.event.active) {
      simulation.alphaTarget(0);
    }
    d.fx = d.fixed ? d.x : null;
    d.fy = d.fixed ? d.y : null;
  }
}

export {
  v3force,
  v4force
};
