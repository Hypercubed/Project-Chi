import Papa from 'babyparse';

export function parse (content, opts) {
  opts = Object.assign({
    delimiter: '\t',
    fastMode: false,
    skipEmptyLines: true,
    comments: '#'
  }, opts);
  const parsed = Papa.parse(content, opts);
  parsed.data = convertToPlainMatrix(parsed.data);
  return parsed;
}

export function convertToPlainMatrix (table) {
  table = table.slice();
  const columns = table.splice(0, 1)[0].slice(1);
  const rows = table.map(d => d.splice(0, 1)[0]);
  return deepFreeze({
    columns,
    rows,
    table
  });
}

// To make obj fully immutable, freeze each object in obj.
// To do so, we use this function.
function deepFreeze (obj) {
  // Retrieve the property names defined on obj
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach(name => {
    const prop = obj[name];

    // Freeze prop if it is an object
    if (typeof prop === 'object' && prop !== null) {
      deepFreeze(prop);
    }
  });

  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}

export default {
  parse
};
