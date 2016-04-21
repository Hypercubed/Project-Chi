import process from 'process';

import angular from 'angular';
import {annotate} from 'angular-annotation-decorator/src/index';

import Papa from 'babyparse';
import uRIjs from 'URIjs';
import {setLineEnding} from 'crlf-helper';

import mime from './mime';

window.process = process;  // annoying

function papaTranslate (load, spec) {
  const parse = Papa.parse(load.content, spec);
  angular.extend(load, parse);
  load.table = true;
}

const dos2unix = content => setLineEnding(content, 'LF');

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
      load.data = angular.fromJson(load.content);
      if (load.data.url && load.data.url.indexOf('api.github.com') > -1) {  // move
        load.data.name = `${load.data.owner.login}/${load.data.id}`;
        load.path = `gists/${load.data.id}`;
      }
    }
  }
};

// try to follow http://dataprotocols.org/data-packages/
function processByType (resource) {
  const _p = processors[resource.mediatype];
  if (_p && _p.translate) {
    _p.translate(resource);
  }
  resource.isDirty = false;
  return resource;
}

function httpReq (resource) {
  return {
    method: 'GET',
    url: resource.url,
    cache: true,
    transformResponse: (data, headers, status) => {
      if (status === 404) {
        return resource;
      }

      const contentType = headers('Content-Type');

      if (contentType) {
        resource.mediatype = resource.mediatype || contentType.split(';')[0];
      }

      resource.content = data;
      return processByType(resource);
    }
  };
}

@annotate('$http', '$q')
export class DataService {
  constructor ($http, $q) {
    const self = this;

    this.reloadResource = function (resource) {
      return $http(httpReq(resource));
    };

    this.loadResource = function (resource) {
      if (resource.url && !(resource.content || resource.data)) {
        return self.reloadResource(resource);
      }
      return $q(resolve => resolve({data: processByType(resource)}));
    };

    this._loadPackage = function (filePath, _package) {  // todo: rename
      _package = this.normalizePackage(filePath, _package);
      const q = _package.resources ? _package.resources.map(this.loadResource) : [];

      return $q.all(q).then(() => {
        _package.resourcesByName = {};
        _package.resources.forEach(r => {
          if (r.name && !_package.resourcesByName[r.name]) {
            _package.resourcesByName[r.name] = r;
          }
        });
        return _package;
      });
    };

    this.loadPackage = function (filePath) {
      return $http.get(filePath).then(
        res => this._loadPackage(filePath, res.data),
        () => console.log('error loading', filePath)
      );
    };

    this.processResource = processByType;
  }

  processResource (resource) {
    return processByType(resource);
  }

  normalizePackage (filePath, _package) {
    _package.base = _package.base || uRIjs(filePath).normalizePathname().directory();
    _package.base = `${_package.base}/`;

    if (_package.resources) {
      _package.resources = _package.resources.map(resource => this.normalize(_package.base, resource));
    }

    if (_package.image) {
      _package.image = uRIjs(_package.image, _package.base).href();
    }

    if (_package.readme) {
      _package.readme = uRIjs(_package.readme, _package.base).href();
    }

    return _package;
  }

  normalize (base, resource) {
    if (!angular.isObject(resource)) {
      resource = {path: resource};
    }

    const uri = uRIjs(resource.path);

    resource.format = resource.format || uri.suffix();
    resource.name = resource.name || uri.filename();

    resource.url = resource.url || uri.absoluteTo(base).href();
    resource.mediatype = resource.mediatype || mime.lookup(resource.format);

    return resource;
  }
}
