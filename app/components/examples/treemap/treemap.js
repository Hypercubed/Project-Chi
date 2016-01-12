/* jshint -W003 */
import angular from 'angular';
import _ from 'lodash';

import { annotate } from 'angular-annotation-decorator/src/index';

import screenfull from 'screenfull';

import webtreemap from 'webtreemap';
import 'webtreemap/webtreemap.css!';
import './treemap.css!';

@annotate('$scope', '$animate', 'dataPackage')
class Ctrl {
  constructor ($scope, $animate, dataPackage) {
    var map = document.getElementById('_examples_treemap__chart');
    // var isFullscreen = false;

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    if (screenfull.enabled) {
      $scope.fullscreen = function () {
        screenfull.request(map);
      };

      document.addEventListener(screenfull.raw.fullscreenchange, function (event) {
        console.log('screenfull.raw.fullscreenerror');
        angular.element(map)[screenfull.isFullscreen ? 'addClass' : 'removeClass']('fullscreen');
        draw();
      });
    }

    draw();

    function draw () {
      while (map.firstChild) {
        map.removeChild(map.firstChild);
      }

      var tree = dataPackage.resources[0].data;

      var treeData = newNode('/');
      if (dataPackage.resources[0].table) {
        tree.forEach(function (d) {
          addNode(d.Source, +d.Size, d.Tag);
        });
      } else {
        for (var source in tree) {
          addNode(source, tree[source]);
        }
      }

      addSizeToTitle(treeData, treeData.data['$area']);

      function addNode (path, size, tag) {
        var parts = path.split('/');
        var node = treeData;
        node.data['$area'] += size;

        parts.forEach(function (part) {
          var child = _.find(node.children, function (child) { return child.name === part; });
          if (!child) {
            child = newNode(part, tag);
            node.children.push(child);
          }

          node = child;
          node.data['$area'] += size;
        });
      }

      webtreemap(map, treeData);
    }
  }
}

function newNode (name, tag) {
  // var $symbol = (name.slice(-1) === '*') ? 'tag' : '';
  return {
    name: name,
    data: {
      '$area': 0,
      '$symbol': tag
    },
    children: []
  };
}

function addSizeToTitle (node, total) {
  var size = node.data['$area'];
  var pct = 100.0 * size / total;

  node.name += ' • ' + size.toLocaleString() + ' • ' + pct.toFixed(2) + '%';
  node.children.forEach(function (x) { addSizeToTitle(x, total); });
}

export default {
  controller: Ctrl,
  templateUrl: 'components/examples/treemap/treemap.html',
  datapackageUrl: 'components/examples/treemap/datapackage.json'
};
