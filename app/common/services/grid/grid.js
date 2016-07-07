import angular from 'angular';

import 'angular-ui-grid';
import 'angular-ui-grid/ui-grid.css!';
import './grid.css!';

const name = 'projectX.grid';

export default name;

angular
  .module(name, [
    'ui.grid',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.grid.resizeColumns',
    'ui.grid.pagination'
  ]);
