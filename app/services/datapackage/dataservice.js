
'use strict';

var isWindows = typeof process != 'undefined' && !!process.platform.match(/^win/);

// Absolute URL parsing, from https://gist.github.com/Yaffle/1088850
function parseURI(url) {
  var m = String(url).replace(/^\s+|\s+$/g, '').match(/^([^:\/?#]+:)?(\/\/(?:[^:@\/?#]*(?::[^:@\/?#]*)?@)?(([^:\/?#]*)(?::(\d*))?))?([^?#]*)(\?[^#]*)?(#[\s\S]*)?/);
  // authority = '//' + user + ':' + pass '@' + hostname + ':' port
  return (m ? {
    href     : m[0] || '',
    protocol : m[1] || '',
    authority: m[2] || '',
    host     : m[3] || '',
    hostname : m[4] || '',
    port     : m[5] || '',
    pathname : m[6] || '',
    search   : m[7] || '',
    hash     : m[8] || ''
  } : null);
}

// From SystemJS
function toAbsoluteURL(base, href) {
  function removeDotSegments(input) {
    var output = [];
    input.replace(/^(\.\.?(\/|$))+/, '')
      .replace(/\/(\.(\/|$))+/g, '/')
      .replace(/\/\.\.$/, '/../')
      .replace(/\/?[^\/]*/g, function (p) {
        if (p === '/..')
          output.pop();
        else
          output.push(p);
    });
    return output.join('').replace(/^\//, input.charAt(0) === '/' ? '/' : '');
  }

  if (isWindows)
    href = href.replace(/\\/g, '/');

  href = parseURI(href || '');
  base = parseURI(base || '');

  return !href || !base ? null : (href.protocol || base.protocol) +
    (href.protocol || href.authority ? href.authority : base.authority) +
    removeDotSegments(href.protocol || href.authority || href.pathname.charAt(0) === '/' ? href.pathname : (href.pathname ? ((base.authority && !base.pathname ? '/' : '') + base.pathname.slice(0, base.pathname.lastIndexOf('/') + 1) + href.pathname) : base.pathname)) +
    (href.protocol || href.authority || href.pathname ? href.search : (href.search || base.search)) +
    href.hash;
}

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
  var _p = processors[resource.type];
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

      if (contentType && !resource.type) {
        resource.type = contentType.split(';')[0];
      }

      resource.content = data;
      return processByType(resource);
    }
  };
}

function DataService($http, $q, $log, mimeType) {
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

    if (!resource.url && resource.path && base) {
      resource.url = toAbsoluteURL(base, resource.path);
    }

    if (!resource.type && resource.path) {
      resource.type = mimeType(resource.path);
    }

    return resource;
  }

  this.normalizePackage = function(filePath, _package) {
    if (_package.resources) {
      _package.resources = _package.resources.map(function(resource) {
        return dataService.normalize(filePath, resource);
      });
    }

    if (_package.image) {
      _package.image = toAbsoluteURL(filePath, _package.image);
    }

    if (_package.readme) {
      _package.readme = toAbsoluteURL(filePath, _package.readme);
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

angular.module('myApp.dataService',['myApp.mimeType'])
  .service('dataService', DataService);