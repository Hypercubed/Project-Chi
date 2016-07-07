import angular from 'angular';

import facetComponent from './facet.component';
import facetBarComponent from './facet-bar.component';
import facetPanelsComponent from './facet-panels.component';

const facets = angular
  .module('projectX.facets', [])
  .component('facet', facetComponent)
  .component('facetbar', facetBarComponent)
  .component('facetpanels', facetPanelsComponent)
  .name;

export default facets;
