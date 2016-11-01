import * as d3 from 'd3-selection';
import {scaleOrdinal, schemeCategory20} from 'd3-scale';
import {dispatch} from 'd3-dispatch';
import d3tip from 'd3-tip';
import * as THREE from 'three';

import {v4force} from './network.d3-force';

export default function ThreeNetwork (opts) {
  opts = opts || {};

  const margin = opts.margin || {top: 0, right: 0, bottom: 0, left: 0};
  let width = opts.width || 'auto';
  let height = opts.height || 'auto';
  // const title = opts.title || 'Network';
  const layout = opts.layout || v4force({});
  const radius = opts.radius || 5;

  const color = scaleOrdinal(schemeCategory20);

  const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
  // renderer.setClearColor( 0x000000, 0);

  const raycaster = new THREE.Raycaster();

  const tip = d3tip()
    .attr('class', 'd3-tip animate fixed')
    .offset([0, 0])
    .html(d => `${d.name}`);

  const listeners = dispatch('mouseover', 'mouseout', 'contextmenu');

  const chart = function (selection) {
    selection.each(function (graph) {
      // console.log('update');

      const container = this;

      if (typeof width !== 'number') {
        width = this.parentNode.clientWidth - margin.left - margin.right;
        if (typeof width !== 'number' || width < 500) {
          width = 500;
        }
      }

      if (typeof height !== 'number') {
        height = 600 / 960 * width;
      }

      // use to track mouse for tool-tip
      const svg = d3.select(container).append('svg')
        .style('position', 'absolute')
        .style('width', '1px')
        .style('height', '1px')
        .style('pointer-events', 'none')
        .call(tip);

      d3.select(container)
        .call(layout.drag);

      const scene = new THREE.Scene();

      const camera = new THREE.PerspectiveCamera(75, width / height, 1, 10000);
      // const camera = new THREE.OrthographicCamera( 0, width, height, 0, -100, 100 );
      camera.position.x = width;
      camera.position.y = -height;
      camera.position.z = 940;

      const nodeData = graph.nodes; // .filter(d => d.visible);
      const linkData = graph.links; // .filter(d => d.target.visible && d.source.visible);

      const nodes = nodeData.map(createNode);
      const links = linkData.map(createLink);

      links.forEach(l => scene.add(l));
      nodes.forEach(n => scene.add(n));

      renderer.setSize(width, height, undefined);

      container.appendChild(renderer.domElement);

      layout
        .size([width, height])
        .nodes(nodeData)
        .links(linkData)
        .start();

      layout.on('tick', () => {
        links.forEach((link, i) => {
          const d = linkData[i];
          link.geometry.vertices[0].set(2 * d.source.x, 2 * -d.source.y, 0);
          link.geometry.vertices[1].set(2 * d.target.x, 2 * -d.target.y, 0);
          link.geometry.verticesNeedUpdate = true;
        });

        nodes.forEach((node, i) => {
          const d = nodeData[i];
          node.position.x = 2 * d.x;
          node.position.y = 2 * -d.y;
          // node.position.z = d.fixed ? (2 * radius) : radius;
        });

        renderer.render(scene, camera, undefined, undefined);
      });

      // let mouse = null;
      let intersects = null;

      layout.drag.subject(() => intersects);

      container.addEventListener('mousemove', event => {
        const mouse = _getRelativeMouseXY(event);
        intersects = getIntesection(mouse);
        if (intersects) {
          svg
            .style('top', `${event.clientY - 15}px`)
            .style('left', `${event.clientX}px`);
          tip.show(intersects, svg.node());
        } else {
          tip.hide();
        }
      }, false);

      container.addEventListener('dblclick', event => {
        if (intersects) {
          event.preventDefault();
          layout.fixed.call(null, intersects);
        }
      });

      function getIntesection (mouse) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(nodes, false);
        if (intersects.length > 0) {
          return graph.nodes[Number(intersects[0].object.name)];
        }
        return null;
      }

      function createNode (d) {
        const size = 2 * radius;
        const nodeGeometry = new THREE.CircleGeometry(size, size, undefined, undefined);
        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: color(d.group),
          transparent: true,
          opacity: d.visible ? 1 : 0.2
        });
        const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        mesh.position.z = radius;
        mesh.name = d.id;
        return mesh;
      }

      function createLink (d) {
        const linkGeometry = new THREE.Geometry();
        linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
        linkGeometry.vertices.push(new THREE.Vector3(0, 0, 0));

        const linkMaterial = new THREE.LineBasicMaterial({
          color: '#999',
          linewidth: Math.sqrt(d.value),
          transparent: true,
          opacity: (d.target.visible && d.source.visible) ? 1 : 0.1
        });
        return new THREE.Line(linkGeometry, linkMaterial, undefined);
      }
    });
  };

  chart.width = function (_) {
    if (arguments.length < 1) {
      return width;
    }
    width = _;
    return chart;
  };

  chart.on = function () {
    const value = listeners.on.apply(listeners, arguments);
    return value === listeners ? chart : value;
  };

  return chart;
}

// from https://github.com/jeromeetienne/threex.domevents/blob/master/threex.domevents.js
function _getRelativeMouseXY (domEvent) {
  let element = domEvent.target || domEvent.srcElement;
  if (element.nodeType === 3) {
    element = element.parentNode; // Safari fix -- see http://www.quirksmode.org/js/events_properties.html
  }

  // get the real position of an element relative to the page starting point (0, 0)
  // credits go to brainjam on answering
  // http://stackoverflow.com/questions/5755312/getting-mouse-position-relative-to-content-area-of-an-element
  const elPosition = {x: 0, y: 0};
  let tmpElement = element;
  // store padding
  let style = getComputedStyle(tmpElement, null);
  elPosition.y += parseInt(style.getPropertyValue('padding-top'), 10);
  elPosition.x += parseInt(style.getPropertyValue('padding-left'), 10);
  // add positions
  do {
    elPosition.x += tmpElement.offsetLeft;
    elPosition.y += tmpElement.offsetTop;
    style = getComputedStyle(tmpElement, null);

    elPosition.x += parseInt(style.getPropertyValue('border-left-width'), 10);
    elPosition.y += parseInt(style.getPropertyValue('border-top-width'), 10);
    tmpElement = tmpElement.offsetParent;
  } while (tmpElement);

  const elDimension = {
    width: (element === window) ? window.innerWidth : element.offsetWidth,
    height: (element === window) ? window.innerHeight : element.offsetHeight
  };

  return {
    x: (2 * Number(domEvent.pageX - elPosition.x) / elDimension.width) - 1,
    y: (-2 * Number(domEvent.pageY - elPosition.y) / elDimension.height) + 1
  };
}
