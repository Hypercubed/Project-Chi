import angular from 'angular';

import 'angular-ui-grid';
import 'angular-ui-grid/ui-grid.css!';

const module = angular
  .module('projectX.grid', [
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.pagination'
  ]);

export default module.name;
