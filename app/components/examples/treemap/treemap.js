/* jshint -W003 */
/* global d3 */

'use strict';

import webtreemap from 'webtreemap';
import 'webtreemap/webtreemap.css!';
import './treemap.css!';

export default class Ctrl {
  /*@ngInject*/
  constructor($scope, dataPackage){

    $scope.dataPackage = dataPackage;
    $scope.change = draw;

    draw();

    function draw() {

      var tree = dataPackage.resources[0].data;

      var treeData = newNode('/');
      for (var source in tree) {
        addNode(source, tree[source]);
      }
      addSizeToTitle(treeData, treeData.data['$area']);

      function addNode(path, size) {
        var parts = path.split('/');
        var node = treeData;
        node.data['$area'] += size;

        parts.forEach(function(part) {
          var child = _.find(node.children, function(child) { return child.name == part; });
          if (!child) {
            var child = newNode(part);
            node.children.push(child);
          }

          node = child;
          node.data['$area'] += size;
        });
      }

      var map = document.getElementById('_examples_treemap__chart');
      webtreemap(map, treeData);

      //window.addEventListener('resize', function() {
      //  webtreemap(map, treeData);
      //});
    }

  }
}

Ctrl.$inject = ['$scope', 'dataPackage'];

function newNode(name) {
  return {
    name: name,
    data: {
      '$area': 0
    },
    children: []
  };
}

function addSizeToTitle(node, total) {
  var size = node.data['$area'],
      pct = 100.0 * size / total;
  node.name += ' • ' + size.toLocaleString() + ' • ' + pct.toFixed(2) + '%';
  node.children.forEach(function(x) { addSizeToTitle(x, total) });
}
