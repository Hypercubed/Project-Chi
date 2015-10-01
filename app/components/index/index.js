'use strict';

import styles from 'common/styles/index.css!';

export default class IndexCtrl {

  /*@ngInject*/
  constructor($scope, dataPackage, dataService){
    $scope.dataPackage = dataPackage;

    dataPackage.resources.forEach(function(resource) {
      dataService.normalizePackage(resource.url, resource.data);
      return dataService.loadPackage(resource.url).then(function(dataPackage) {
        dataPackage.resources.forEach(function(resource) {
          dataService.normalizePackage(resource.url, resource.data);
        });
        resource.data = dataPackage;
      });
    });

  }

}

IndexCtrl.$inject = ['$scope', 'dataPackage', 'dataService'];
