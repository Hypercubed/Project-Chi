
import urijs from 'URIjs';

export const internalLinkTemplate = x => `<div class="ui-grid-cell-contents" title="TOOLTIP">
  <a href="#/${x}/{{COL_FIELD}}" target="_self">{{COL_FIELD}}</a>
</div>`;

export const filterTemplate = `<div class="ui-grid-cell-contents" title="TOOLTIP">
  {{COL_FIELD}}
  <button class="btn btn-link btn-xs" ng-click="grid.appScope.$ctrl.filter(row.entity.id)" title="Click to filter Gene association table above">
    <i class="fa fa-filter" aria-hidden="true"></i>
  </button>
</div>`;

const hostLinks = {
  'en.wikipedia.org': 'wikipedia',
  'www.ncbi.nlm.nih.gov': 'ncbi'
};

export function getLinkText (uri) {
  const host = urijs(uri).hostname();
  return hostLinks[host] || host;
}

export const externalLinkTemplate = `<div class="ui-grid-cell-contents" title="TOOLTIP">
  <span ng-switch="COL_FIELD">
    <span ng-switch-when="no">
      {{COL_FIELD}}
    </span>
    <span ng-switch-when="uncurated">
      {{COL_FIELD}}
    </span>
    <span ng-switch-default>
      <a href="{{COL_FIELD}}" target="_self">
        {{grid.appScope.$ctrl.getLinkText(COL_FIELD)}}
      </a>
    </span>
  </span>
</div>`;

export const gridDefaults = {
  enableFiltering: false,
  enableGridMenu: true,
  enableColumnMenus: false,
  enableSelectAll: false,
  enableRowSelection: true,
  selectionRowHeaderWidth: 35,
  multiSelect: false
};

export const headerCellTemplate = `
<div role="columnheader"
      ng-class="{ 'sortable': sortable }"
      ui-grid-one-bind-aria-labelledby-grid="col.uid + '-header-text ' + col.uid + '-sortdir-text'"
      aria-sort="{{col.sort.direction == asc ? 'ascending' : ( col.sort.direction == desc ? 'descending' : (!col.sort.direction ? 'none' : 'other'))}}"
      uib-tooltip-html="col.headerTooltip(col)"
      tooltip-placement="top"
      tooltip-append-to-body="true">
    <div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex"><span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + '-header-text'">{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid="col.uid + '-sortdir-text'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"><i ng-class="{ 'ui-grid-icon-up-dir': col.sort.direction == asc, 'ui-grid-icon-down-dir': col.sort.direction == desc, 'ui-grid-icon-blank': !col.sort.direction }" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + ' ' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number">{{col.sort.priority + 1}}</sub></span></div>
    <div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + '-menu-button'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{'ui-grid-column-menu-button-last-col': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div>
    <div ui-grid-filter></div>
</div>`;
