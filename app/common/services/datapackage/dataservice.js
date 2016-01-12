import angular from 'angular';
import { annotate } from 'angular-annotation-decorator/src/index';

import Papa from 'babyparse';
import URIjs from 'URIjs';

import process from 'process';

import mime from './mime';

window.process = process;  // annoying

function papaTranslate (load, spec) {
  var parse = Papa.parse(load.content, spec);
  angular.extend(load, parse);
  load.table = true;
}

const DOS2UNIX = (content) => content.replace(/\r/g, '\n');

const processors = {
  'text/tab-separated-values': {
    translate: function (load) {
      papaTranslate(load, {header: true, delimiter: '\t', skipEmptyLines: true});
    }
  },

  'text/csv': {
    translate: function (load) {
      papaTranslate(load, {header: true, delimiter: ',', skipEmptyLines: true});
    }
  },

  'text/plain': {
    translate: function (load) {
      load.content = DOS2UNIX(load.content);
    }
  },

  'application/json': {
    translate: function (load) {
      load.data = angular.fromJson(load.content);
      if (load.data.url && load.data.url.indexOf('api.github.com') > -1) {  // move
        load.data.name = load.data.owner.login + '/' + load.data.id;
        load.path = 'gists/' + load.data.id;
      }
    }
  }
};

// try to follow http://dataprotocols.org/data-packages/
function processByType (resource) {
  var _p = processors[resource.mediatype];
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
    transformResponse: function (data, headers, status) {
      if (status === 404) { return resource; }

      var contentType = headers('Content-Type');

      if (contentType) {
        resource.mediatype = resource.mediatype || contentType.split(';')[0];
      }

      resource.content = data;
      return processByType(resource);
    }
  };
}

@annotate('$http', '$q', '$log')
export class DataService {
  constructor ($http, $q, $log) {
    this.loadResource = function (resource) {
      if (resource.url && !(resource.content || resource.data)) {
        return $http(httpReq(resource));
      } else {
        return $q(resolve => resolve({data: processByType(resource)}));
      }
    };

    this._loadPackage = function (filePath, _package) {  // todo: rename
      _package = this.normalizePackage(filePath, _package);
      var q = _package.resources ? _package.resources.map(this.loadResource) : [];

      return $q.all(q).then(function () {
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
        res => console.log('error loading', filePath)
      );
    };
  }

  processResource (resource) {
    return processByType(resource);
  }

  normalizePackage (filePath, _package) {
    _package.base = _package.base || URIjs(filePath).normalizePathname().directory() + '/';

    if (_package.resources) {
      _package.resources = _package.resources.map((resource) => this.normalize(_package.base, resource));
    }

    if (_package.image) {
      _package.image = URIjs(_package.image, _package.base).href();
    }

    if (_package.readme) {
      _package.readme = URIjs(_package.readme, _package.base).href();
    }

    return _package;
  }

  normalize (base, resource) {
    if (!angular.isObject(resource)) {
      resource = { path: resource };
    }

    var uri = URIjs(resource.path);

    resource.format = resource.format || uri.suffix();
    resource.name = resource.name || uri.filename();

    resource.url = resource.url || uri.absoluteTo(base).href();
    resource.mediatype = resource.mediatype || mime.lookup(resource.format);

    return resource;
  }
}
