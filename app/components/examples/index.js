'use strict';

import './index.css!';

export default class IndexCtrl {

  /*@ngInject*/
  constructor($scope, dataPackage){
    $scope.dataPackage = dataPackage;
  }

}

IndexCtrl.resolve = {
  /*@ngInject*/
  dataPackage: ['$route', 'dataService', function($route, dataService) {
    return dataService.loadPackage($route.current.templateUrl+'/../datapackage.json').then(function(dataPackage) {
      dataPackage.resources.forEach(function(resource) {
        dataService.normalizePackage(resource.url, resource.data);
      });

      return dataPackage;
    });
  }]
};

IndexCtrl.$inject = ['$scope','dataPackage'];