import angular from 'angular';
import _ from 'lodash';

import screenfull from 'screenfull';

import webtreemap from 'webtreemap';
import 'webtreemap/webtreemap.css!';
import './treemap.css!';

function controller () {
  const $ctrl = this;

  const $map = document.getElementById('_examples_treemap__chart');

  $ctrl.$onInit = change;
  $ctrl.editorOptions = {
    data: $ctrl.dataPackage,
    enableSvgDownload: false,
    enablePngDownload: false,
    onChange: change
  };

  if (screenfull.enabled) {
    $ctrl.fullscreen = function () {
      screenfull.request($map);
    };

    document.addEventListener(screenfull.raw.fullscreenchange, () => {
      console.log('screenfull.raw.fullscreenerror');
      angular.element($map)[screenfull.isFullscreen ? 'addClass' : 'removeClass']('fullscreen');
      change();
    });
  }

  function change () {
    const map = $map;
    while ($map.firstChild) {
      map.removeChild(map.firstChild);
    }

    const tree = $ctrl.dataPackage.resources[0].data;
    const treeData = newNode('/');

    if ($ctrl.dataPackage.resources[0].table) {
      tree.forEach(d => {
        addNode(d.Source, Number(d.Size), d.Tag);
      });
    } else {
      for (const source in tree) {
        if (Object.hasOwnProperty.call(tree, source)) {
          addNode(source, tree[source]);
        }
      }
    }

    addSizeToTitle(treeData, treeData.data.$area);

    function addNode (path, size, tag) {
      const parts = path.split('/');
      let node = treeData;
      node.data.$area += size;

      parts.forEach(part => {
        let child = _.find(node.children, child => child.name === part);
        if (!child) {
          child = newNode(part, tag);
          node.children.push(child);
        }

        node = child;
        node.data.$area += size;
      });
    }

    webtreemap(map, treeData);
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

export default {
  controller,
  templateUrl: 'components/examples/treemap/treemap.html',
  bindings: {
    dataPackage: '<package'
  }
};
