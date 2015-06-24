'use strict';

// examples
import ExamplesCtrl from 'components/examples/index';
import ChiasmCtrl from 'components/examples/chiasm/chiasm';
import BioJSCtrl from 'components/examples/biojs/biojs';
import BarsCtrl from 'components/examples/bars/bars';
import TrainsCtrl from 'components/examples/trains/trains';

/*@ngInject*/
function configRoutes($routeProvider) {
  $routeProvider
  
  // examples
  .when('/examples', {
    templateUrl: 'components/examples/index.html',
    controller: 'ExamplesCtrl',
    resolve: ExamplesCtrl.resolve
  })
  .when('/examples/chiasm', {
		templateUrl: 'components/examples/chiasm/chiasm.html',
		controller: 'ChiasmCtrl',
		resolve: ChiasmCtrl.resolve
	})
	.when('/examples/biojs', {
		templateUrl: 'components/examples/biojs/biojs.html',
		controller: 'BioJSCtrl',
		resolve: BioJSCtrl.resolve
	})
	.when('/examples/bars', {
		templateUrl: 'components/examples/bars/bars.html',
		controller: 'BarsCtrl',
		resolve: BarsCtrl.resolve
	})
	.when('/examples/hexbin', {
		templateUrl: 'components/examples/hexbin/hexbin.html',
	})
	.when('/examples/trains', {
		templateUrl: 'components/examples/bars/bars.html',
		controller: 'TrainsCtrl',
		resolve: TrainsCtrl.resolve
	});
}

configRoutes.$inject = ['$routeProvider'];

import app from 'components/app';

app

  //examples
  .controller('ExamplesCtrl', ExamplesCtrl)
  .controller('ChiasmCtrl', ChiasmCtrl)
  .controller('BioJSCtrl', BioJSCtrl)
  .controller('BarsCtrl', BarsCtrl)
  .controller('TrainsCtrl', TrainsCtrl)

  .config(configRoutes);