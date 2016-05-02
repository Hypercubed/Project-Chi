import process from 'process';

import {processByType} from './processors';
import {normalizePackage, normalizeResource} from './datapackage';

window.process = process;  // annoying

DataService.$inject = ['$http', '$q'];
export function DataService ($http, $q) {
  return {
    loadPackage,  // these require $http
    reloadResource,

    loadResource,
    _loadPackage: processPackage,  // todo: remove
    processPackage,

    normalize: normalizeResource,
    normalizePackage,
    processResource: processByType
  };

  function loadPackage (filePath) {
    return $http.get(filePath).then(
      res => processPackage(filePath, res.data),
      () => {
        return $q.reject(`datapackage ${filePath} does not exist`);
      }
    );
  }

  function processPackage (filePath, _package) {
    _package = normalizePackage(filePath, _package);
    const q = _package.resources ? _package.resources.map(loadResource) : [];

    return $q.all(q).then(() => {
      _package.resourcesByName = {};
      _package.resources.forEach(r => {
        if (r.name && !_package.resourcesByName[r.name]) {
          _package.resourcesByName[r.name] = r;
        }
      });
      return _package;
    });
  }

  function reloadResource (resource) {
    return $http(createHttpRequest(resource)).catch(() => {
      return $q.reject(`datapackage ${resource.url} does not exist`);
    });
  }

  function loadResource (resource) {
    if (resource.url && !(resource.content || resource.data)) {
      return reloadResource(resource);
    }
    return $q(resolve => resolve({data: processByType(resource)}));
  }
}

function createHttpRequest (resource) {
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
