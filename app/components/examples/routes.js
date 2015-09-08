'use strict';

// examples
import ExamplesCtrl from 'components/examples/index';
import ChiasmCtrl from 'components/examples/chiasm/chiasm';
import BioJSCtrl from 'components/examples/biojs/biojs';
import BarsCtrl from 'components/examples/bars/bars';
import TrainsCtrl from 'components/examples/trains/trains';
//import PolymerCtrl from 'components/examples/polymer/barChart-controller';

/*@ngInject*/
function configRoutes($routeProvider) {

  $routeProvider

  // examples
  .when('/examples', {
    templateUrl: 'components/examples/index.html',
    controller: 'ExamplesCtrl',
    datapackageUrl: 'components/examples/datapackage.json'
  })
  .when('/examples/chiasm', {
		templateUrl: 'components/examples/chiasm/chiasm.html',
		controller: 'ChiasmCtrl',
    datapackageUrl: 'components/examples/chiasm/datapackage.json'
	})
	.when('/examples/biojs', {
		templateUrl: 'components/examples/biojs/biojs.html',
		controller: 'BioJSCtrl',
    datapackageUrl: 'components/examples/biojs/datapackage.json'
	})
	.when('/examples/bars', {
		templateUrl: 'components/examples/bars/bars.html',
		controller: 'BarsCtrl',
    datapackageUrl: 'components/examples/bars/datapackage.json'
	})
	.when('/examples/hexbin', {
		templateUrl: 'components/examples/hexbin/hexbin.html',
	})
	.when('/examples/trains', {
		templateUrl: 'components/examples/bars/bars.html',
		controller: 'TrainsCtrl',
    datapackageUrl: 'components/examples/bars/datapackage.json'
	})
  /* .when('/examples/polymer', {
    templateUrl: 'components/examples/polymer/barChart-template.html',
    controller: 'PolymerCtrl',
    datapackageUrl: 'components/examples/polymer/datapackage.json'
  }) */
  ;
}

configRoutes.$inject = ['$routeProvider'];

export default angular
  .module('examples', ['projectX.dataService'])

  //examples
  .controller('ExamplesCtrl', ExamplesCtrl)
  .controller('ChiasmCtrl', ChiasmCtrl)
  .controller('BioJSCtrl', BioJSCtrl)
  .controller('BarsCtrl', BarsCtrl)
  .controller('TrainsCtrl', TrainsCtrl)
  //.controller('PolymerCtrl', PolymerCtrl)

  .config(configRoutes)
;
