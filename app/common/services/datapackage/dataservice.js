
'use strict';

import Papa from 'papaparse';
import URIjs from 'URIjs';

function papaTranslate(load, spec) {
  var parse = Papa.parse(load.content, spec);
  angular.extend(load, parse);
  load.table = true;
}

function DOS2UNIX(content) {
  return content
    .replace(/\r/g,'\n');
}

var processors = {};

processors['text/tab-separated-values'] = {
  translate: function(load) {
    papaTranslate(load, {header: true, delimiter: '\t', skipEmptyLines: true});
  }
};

processors['text/csv'] = {
  translate: function(load) {
    papaTranslate(load, {header: true, delimiter: ',', skipEmptyLines: true});
  }
};

processors['text/plain'] = {
  translate: function(load) {
    load.content = DOS2UNIX(load.content);
  }
};

processors['application/json'] = {
  translate: function(load) {
    load.data = angular.fromJson(load.content);
    if (load.data.url && load.data.url.indexOf('api.github.com') > -1) {  // move
      load.data.name = load.data.owner.login +'/'+load.data.id;
      load.path = 'gists/'+load.data.id;
    }
  }
};

// try to follow http://dataprotocols.org/data-packages/

function processByType(resource) {
  var _p = processors[resource.mediatype];
  if (_p && _p.translate) {
    _p.translate(resource);
  }
  resource.isDirty = false;
  return resource;
}

function httpReq(resource) {
  return {
    method: 'GET',
    url: resource.url,
    transformResponse: function(data, headers) {
      var contentType = headers('Content-Type');

      if (contentType) {
        resource.mediatype = resource.mediatype || contentType.split(';')[0];
      }

      resource.content = data;
      return processByType(resource);
    }
  };
}

export function DataService($http, $q, $log, mimeType) {
  var dataService = this;

  this.processResource = function(resource) {
    return processByType(resource);
  }

  this.loadResource = function(resource) {
    if (resource.url && !(resource.content || resource.data)) {
      return $http(httpReq(resource));
    } else {
      return $q(function(resolve) {
        resolve({data: processByType(resource)});
      });
    }
  };

  this.normalize = function(base, resource) {
    if (!angular.isObject(resource)) {
      resource = { name: resource, path: resource };
    }

    var uri = URIjs(resource.path);

    resource.format = resource.format || uri.suffix();
    resource.name = resource.name || uri.filename();

    resource.url = resource.url || uri.absoluteTo(base).href();
    resource.mediatype = resource.mediatype || mimeType(resource.format);

    return resource;
  }

  this.normalizePackage = function(filePath, _package) {

    _package.base = _package.base || URIjs(filePath).normalizePathname().directory()+'/';

    if (_package.resources) {
      _package.resources = _package.resources.map(function(resource) {
        return dataService.normalize(_package.base, resource);
      });
    }

    if (_package.image) {
      _package.image = URIjs(_package.image, _package.base).href();
    }

    if (_package.readme) {
      _package.readme = URIjs(_package.readme, _package.base).href();
    }

    return _package;
  }

  this.loadPackage = function(filePath) {

    return $http.get(filePath).then(function(res) {
      var _package = dataService.normalizePackage(filePath, res.data);

      var q = _package.resources.map(dataService.loadResource);

      return $q.all(q).then(function() {
        return _package;
      });

    });
  }
}

DataService.$inject = ['$http', '$q', '$log', 'mimeType'];
