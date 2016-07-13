import angular from 'angular';

import grid from 'common/services/grid/grid';
import facets from 'common/services/facets/facets';

// examples
import examplesComponent from 'components/examples/index';
import chiasmComponent from 'components/examples/chiasm/chiasm';
import bioJSComponent from 'components/examples/biojs/biojs';
import barsComponent from 'components/examples/bars/bars';
import treemapComponent from 'components/examples/treemap/treemap';
import polymerComponent from 'components/examples/polymer/bar-chart';
import universeComponent from 'components/examples/universe/universe';

import 'd3-plugins/hexbin/hexbin';  // needed for /examples/hexbin

export default angular
  .module('examples', [
    'projectX.dataService',
    grid,
    facets
  ])
  .component('bars', barsComponent)
  .component('examples', examplesComponent)
  .component('biojs', bioJSComponent)
  .component('chiasm', chiasmComponent)
  // .component('trains', trainsComponent)
  .component('polymer', polymerComponent)
  .component('treemapPage', treemapComponent)
  .component('universe', universeComponent)
  .config(['$routeProvider', $routeProvider => {
    $routeProvider
      .when('/examples', {
        template: '<examples data-package="$resolve.dataPackage"></examples>',
        datapackageUrl: 'components/examples/datapackage.json'
      })
      .when('/examples/chiasm', {
        template: '<chiasm data-package="$resolve.dataPackage"></chiasm>',
        datapackageUrl: 'components/examples/chiasm/datapackage.json'
      })
      .when('/examples/biojs', {
        template: '<biojs data-package="$resolve.dataPackage"></biojs>',
        datapackageUrl: 'components/examples/biojs/datapackage.json'
      })
      .when('/examples/bars', {
        template: '<bars data-package="$resolve.dataPackage"></bars>',
        datapackageUrl: 'components/examples/bars/datapackage.json'
      })
      .when('/examples/treemap', {
        template: '<treemap-page data-package="$resolve.dataPackage"></treemap-page>',
        datapackageUrl: 'components/examples/treemap/datapackage.json'
      })
      .when('/examples/polymer', {
        template: '<polymer data-package="$resolve.dataPackage"></polymer>',
        datapackageUrl: 'components/examples/polymer/datapackage.json'
      })
      .when('/examples/universe', {
        template: '<universe data-package="$resolve.dataPackage"></universe>',
        datapackageUrl: 'components/examples/universe/datapackage.json'
      });
  }]);
