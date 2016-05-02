import Papa from 'babyparse';
import {setLineEnding} from 'crlf-helper';

const dos2unix = content => setLineEnding(content, 'LF');

function papaTranslate (load, spec) {
  const parse = Papa.parse(load.content, spec);
  Object.assign(load, parse);
  load.table = true;
}

function fromJson (json) {
  return typeof json === 'string' ?
    JSON.parse(json) :
    json;
}

const processors = {
  'text/tab-separated-values': {
    translate: load => {
      papaTranslate(load, {header: true, delimiter: '\t', skipEmptyLines: true});
    }
  },

  'text/csv': {
    translate: load => {
      papaTranslate(load, {header: true, delimiter: ',', skipEmptyLines: true});
    }
  },

  'text/plain': {
    translate: load => {
      load.content = dos2unix(load.content);
    }
  },

  'application/json': {
    translate: load => {
      load.data = fromJson(load.content);
      if (load.data.url && load.data.url.indexOf('api.github.com') > -1) {  // move
        load.data.name = `${load.data.owner.login}/${load.data.id}`;
        load.path = `gists/${load.data.id}`;
      }
    }
  }
};

// try to follow http://dataprotocols.org/data-packages/
function processByType (resource, type) {
  const _p = processors[type || resource.mediatype];
  if (_p && _p.translate) {
    _p.translate(resource);
  }
  resource.isDirty = false;
  return resource;
}

export {
  processors,
  processByType
};
