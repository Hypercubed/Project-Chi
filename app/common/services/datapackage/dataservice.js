// import process from 'process';

import {processByType} from './processors';
import {normalizePackage, normalizeResource} from './datapackage';

// window.process = process;  // annoying

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
    processResource: processByType,

    reindexPackage,

    addResource
  };

  function loadPackage (filePath) {
    return $http.get(filePath)
    .then(res => processPackage(filePath, res.data))
    .catch(
      err => {
        throw new Error(`error loading ${filePath}, ${err}`);
      }
    );
  }

  function processPackage (filePath, datapackage) {
    datapackage = normalizePackage(filePath, datapackage);
    const q = datapackage.resources ? datapackage.resources.map(loadResource) : [];

    return $q.all(q)
    .then(() => {
      return reindexPackage(datapackage);
    });
  }

  function reindexPackage (datapackage) {
    datapackage.resourcesByName = {};
    datapackage.resources.forEach(r => {
      if (r.name && !datapackage.resourcesByName[r.name]) {
        datapackage.resourcesByName[r.name] = r;
      }
    });
    return datapackage;
  }

  function reloadResource (resource) {
    return $http(createHttpRequest(resource))
    .catch(err => {
      throw new Error(`error loading ${resource.url}, ${err}`);
    });
  }

  function loadResource (resource) {
    if (resource.url && !(resource.content || resource.data)) {
      return reloadResource(resource);  // todo: check for urls
    }
    return $q(resolve => resolve({data: processByType(resource)}));
  }

  function addResource (datapackage, resource) {
    normalizeResource(datapackage, resource);

    datapackage.resources.push(resource);
    datapackage.resourcesByName[resource.name] = resource;

    processByType(resource);
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
