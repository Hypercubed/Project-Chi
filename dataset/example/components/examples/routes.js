import angular from 'angular';

// examples
import examplesComponent from 'components/examples/index';
import chiasmComponent from 'components/examples/chiasm/chiasm';
import bioJSComponent from 'components/examples/biojs/biojs';
import barsComponent from 'components/examples/bars/bars';
import trainsComponent from 'components/examples/trains/trains';
import polymerComponent from 'components/examples/polymer/barChart-controller';
import treeMapComponent from 'components/examples/treemap/treemap';

export default angular
  .module('examples', ['projectX.dataService'])
  .config(['$routeProvider', $routeProvider => {
    $routeProvider
      .when('/examples', examplesComponent)
      .when('/examples/chiasm', chiasmComponent)
      .when('/examples/biojs', bioJSComponent)
      .when('/examples/bars', barsComponent)
      .when('/examples/treemap', treeMapComponent)
      .when('/examples/hexbin', {
        templateUrl: 'components/examples/hexbin/hexbin.html'
      })
      .when('/examples/trains', trainsComponent)
      .when('/examples/polymer', polymerComponent);
  }]);
