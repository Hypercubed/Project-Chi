const template = `
  <div class="tag-bar">
    <span ng-repeat="(key, facet) in $ctrl.facets">
      <span ng-repeat="item in facet.filterTo">
        <span class="label label-default">
          {{facet.displayName}}: {{item}}
          <i class="fa fa-times" aria-hidden="true" ng-click="$ctrl.setFilter(key, item)"></i>
        </span>
      </span>
    </span>
  </div>`;

export default {
  template,
  bindings: {
    facets: '<',
    setFilter: '<'
  }
};
