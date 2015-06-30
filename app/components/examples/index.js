'use strict';

import './index.css!';

export default class IndexCtrl {

  /*@ngInject*/
  constructor($scope, dataPackage, dataService){
    $scope.dataPackage = dataPackage;

    dataPackage.resources.forEach(function(resource) {
      dataService.normalizePackage(resource.url, resource.data);
    });
  }

}

IndexCtrl.resolve = {
  /*@ngInject*/
  dataPackage: ['$route', 'dataService', function($route, dataService) {
    return dataService.loadPackage($route.current.templateUrl+'/../datapackage.json');
  }]
};

IndexCtrl.$inject = ['$scope','dataPackage','dataService'];
