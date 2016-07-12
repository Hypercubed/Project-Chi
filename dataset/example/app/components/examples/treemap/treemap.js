import angular from 'angular';

import screenfull from 'screenfull';

import webtreemap from 'webtreemap';
import 'webtreemap/webtreemap.css!';
import './treemap.css!';

controller.$inject = ['$log'];
function controller ($log) {
  const $ctrl = this;

  const $map = angular.element(document.getElementById('_examples_treemap__chart'));

  if (screenfull.enabled) {
    $ctrl.fullscreen = function () {
      screenfull.request($map[0]);
    };

    document.addEventListener(screenfull.raw.fullscreenchange, () => {
      $log.debug('screenfull.raw.fullscreenerror');
      angular.element($map)[screenfull.isFullscreen ? 'addClass' : 'removeClass']('fullscreen');
      change();
    });
  }

  return Object.assign($ctrl, {
    editorOptions: {
      data: $ctrl.dataPackage,
      enableSvgDownload: false,
      enablePngDownload: false,
      onChange: change
    },
    draw: change,
    $onInit: change
  });

  function change () {
    $map.empty();

    $ctrl.dataPackage.resources.forEach(res => {
      const tree = res.data;
      const treeData = newNode('/');

      if (res.table) {
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
          let child = node.children.find(child => child.name === part);
          if (!child) {
            child = newNode(part, tag);
            node.children.push(child);
          }

          node = child;
          node.data.$area += size;
        });
      }

      const h = angular.element(`<h4>${res.name}</h4>`);
      angular.element($map).append(h);

      const d = angular.element('<div></div>');
      $map.append(d);

      webtreemap(d[0], treeData);
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

export default {
  controller,
  templateUrl: 'components/examples/treemap/treemap.html',
  bindings: {
    dataPackage: '<package'
  }
};
