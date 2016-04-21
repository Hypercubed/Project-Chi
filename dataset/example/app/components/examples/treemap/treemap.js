/* jshint -W003 */
import angular from 'angular';
import _ from 'lodash';

import screenfull from 'screenfull';

import webtreemap from 'webtreemap';
import 'webtreemap/webtreemap.css!';
import './treemap.css!';

class controller {
  constructor () {
    this.$map = document.getElementById('_examples_treemap__chart');
    // var isFullscreen = false;

    if (screenfull.enabled) {
      this.fullscreen = function () {
        screenfull.request(this.$map);
      };

      document.addEventListener(screenfull.raw.fullscreenchange, () => {
        console.log('screenfull.raw.fullscreenerror');
        angular.element(this.$map)[screenfull.isFullscreen ? 'addClass' : 'removeClass']('fullscreen');
        this.change();
      });
    }
  }

  change () {
    const map = this.$map;
    while (this.$map.firstChild) {
      map.removeChild(map.firstChild);
    }

    const tree = this.dataPackage.resources[0].data;
    const treeData = newNode('/');

    if (this.dataPackage.resources[0].table) {
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

  $onInit () {
    this.change();
  }
}

function newNode (name, tag) {
  // var $symbol = (name.slice(-1) === '*') ? 'tag' : '';
  return {
    name,
    data: {
      $area: 0,
      $symbol: tag
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

export default {
  controller,
  templateUrl: 'components/examples/treemap/treemap.html',
  bindings: {
    dataPackage: '<package'
  }
};
