
// adapted from readableColumnName: https://github.com/angular-ui/ui-grid/blob/master/src/js/core/services/ui-grid-util.js
export function readableName (columnName) {
  // Convert underscores to spaces
  if (typeof columnName === 'undefined' || columnName === undefined || columnName === null) {
    return columnName;
  }

  if (typeof columnName !== 'string') {
    columnName = String(columnName);
  }

  columnName = columnName.split('.').pop();

  return columnName.replace(/_+/g, ' ')
    // Replace a completely all-capsed word with a first-letter-capitalized version
    .replace(/^[A-Z]+$/, match => {
      return (match.charAt(0).toUpperCase() + match.slice(1)).toLowerCase();
    })
    // Capitalize the first letter of words
    .replace(/([\w\u00C0-\u017F]+)/g, match => {
      return match.charAt(0).toUpperCase() + match.slice(1);
    })
    // Put a space in between words that have partial capilizations (i.e. 'firstName' becomes 'First Name')
    // .replace(/([A-Z]|[A-Z]\w+)([A-Z])/g, "$1 $2");
    // .replace(/(\w+?|\w)([A-Z])/g, "$1 $2");
    .replace(/(\w+?(?=[A-Z]))/g, '$1 ');
}

export function createFacet (cf, facet) {
  const displayName = facet.displayName || readableName(facet.key);

  const accessor = facet.accessor || (d => d[facet.key]);
  const dimension = cf.dimension(accessor);
  const groupBy = facet.groupBy || undefined;

  const filterTo = [];

  const self = {
    displayName,
    dimension,
    group: groupBy ? dimension.group(groupBy) : dimension.group().orderNatural(),
    filter,
    filterTo,
    filterFn,
    toggle,
    visible: true,
    ...facet
  };

  return self;

  function toggle (value) {
    if (value === null) {
      filterTo.splice(0, filterTo.length);
    } else {
      const index = filterTo.indexOf(value);
      if (index > -1) {
        filterTo.splice(index, 1);
      } else {
        filterTo.push(value);
      }
    }
    filter();
  }

  function filter () {
    if (filterTo.length === 0) {
      return dimension.filter(null);
    }

    if (filterTo.length === 1 && !groupBy) {
      return dimension.filterExact(filterTo[0]);
    }

    return dimension.filter(filterFn);
  }

  function filterFn (d) {
    if (filterTo.length === 0) {
      return true;
    }
    return self.groupBy ?
      filterTo.indexOf(self.groupBy(d)) > -1 :
      filterTo.indexOf(d) > -1;
  }
}

export function setFilter (state, type, value) {
  if (type === 'all' || type === null || type === '*') {
    type = Object.keys(state);
  } else if (typeof type === 'string') {
    type = [type];
  }
  type.forEach(t => {
    state[t].toggle(value);
  });
}

export function setFilter$ (state, onUpdate) {
  return function (type, value) {
    setFilter(state, type, value);
    onUpdate(state);
  };
}
