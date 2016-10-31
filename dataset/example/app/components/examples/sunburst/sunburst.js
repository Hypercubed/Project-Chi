import angular from 'angular';

import screenfull from 'screenfull';

import './sunburst.less!';
import SunburstChart from './sunburst-chart';

controller.$inject = ['$log', '$timeout', '$element'];
function controller ($log, $timeout, $element) {
  const $ctrl = this;
  const chart = new SunburstChart();

  if (screenfull.enabled) {
    document.addEventListener(screenfull.raw.fullscreenchange, event => {
      $log.debug('screenfull.raw.fullscreenerror');
      angular.element(event.target).toggleClass('fullscreen', screenfull.isFullscreen);
      draw();
    });
  }

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableSvgDownload: false,
      enablePngDownload: false,
      onChange: draw
    },
    draw,
    $onInit () {
      $timeout(draw, 0);
    },
    fullscreen ($event) {
      const elm = angular.element($event.target).parent().find('sunburst');
      screenfull.request(elm[0]);
    }
  });

  function draw () {
    angular.forEach($element.find('sunburst'), d => {
      const elm = angular.element(d);
      const name = elm.attr('data-name');
      drawMap(elm, $ctrl.dataPackage.$resourcesByName[name]);
    });
  }

  function drawMap (elm, res) {
    elm.empty();

    if (!res.data) {
      return;
    }

    const tree = res.data;
    const treeData = newNode('/');

    if (Array.isArray(tree)) {
      tree.forEach(d => {
        addNode(d.Source, d.Size, d.Tag);
      });
    } else {
      for (const source in tree) {
        if (Object.hasOwnProperty.call(tree, source)) {
          addNode(source, tree[source]);
        }
      }
    }

    addSizeToTitle(treeData, treeData.data.$area);
    // var t = document.createTextNode("Hello World");     // Create a text node
    // elm[0].appendChild(t);
    // webtreemap(elm[0], treeData);
    chart(elm[0], treeData);
    return;

    function addNode (path, size, tag) {
      const parts = path.split('/');
      let node = treeData;
      node.data.$area += size;

      parts.forEach(part => {
        let child = node.children.find(child => child.name === part);
        if (!child) {
          child = newNode(part, tag);
          node.children.push(child);
        }

        node = child;
        node.data.$area += size;
      });
    }

    function newNode (name, tag) {
      // var $symbol = (name.slice(-1) === '*') ? 'tag' : '';
      return {
        name,
        data: {
          $area: 0,
          symbol: tag
        },
        children: []
      };
    }

    function addSizeToTitle (node, total) {
      const size = node.data.$area;
      const pct = 100.0 * size / total;

      node.name += ` • ${size.toLocaleString()} • ${pct.toFixed(2)}%`;
      node.children.forEach(x => {
        addSizeToTitle(x, total);
      });
    }
  }
}

export default {
  controller,
  templateUrl: 'components/examples/sunburst/sunburst.html',
  bindings: {
    dataPackage: '<package'
  }
};
