'use strict';

import 'components/main/main';
import 'components/about/about';

import app from 'components/app';


function configRoutes($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'components/main/main.html',
		controller: 'MainCtrl',
		controllerAs: 'main'
	})
	.when('/about', {
		templateUrl: 'components/about/about.html',
		controller: 'AboutCtrl',
		controllerAs: 'about'
	})
	.otherwise({
		redirectTo: '/'
	});
}

configRoutes.$inject = ['$routeProvider'];

app
	.config(configRoutes);
