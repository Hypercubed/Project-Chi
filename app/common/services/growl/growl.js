import 'angular-growl/build/angular-growl.js';
import 'angular-growl/build/angular-growl.css!';

import angular from 'angular';

const mod = angular
  .module('projectX.growl', ['angular-growl'])
  .run(runGrowl);

export default mod.name;

runGrowl.$inject = ['$rootScope', '$location', 'growl'];
function runGrowl ($rootScope, $location, growl) {
  $rootScope.$on('$routeChangeError', (event, curr, prev, rej) => {
    if (typeof rej !== 'string') {
      if (rej.status && rej.statusText) {
        rej = `${rej.status} ${rej.statusText}`;
      } else if (rej.message) {
        rej = rej.message;
      } else {
        rej = String(rej);
      }
    }
    return growl.error(`failed to change routes; ${rej}`);
  });
}
