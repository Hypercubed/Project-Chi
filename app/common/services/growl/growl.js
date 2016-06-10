import 'angular-growl/build/angular-growl.js';
import 'angular-growl/build/angular-growl.css!';

import angular from 'angular';

const name = 'projectX.growl';

export default name;

angular
  .module(name, ['angular-growl'])
  .run(runGrowl);

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
