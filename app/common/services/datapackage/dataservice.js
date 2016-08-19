// import process from 'process';

import dp from './datapackage';

// import {processByType} from './processors';
// import {normalizePackage, normalizeResource} from './datapackage';

// window.process = process;  // annoying
run.$inject = ['$http'];
export function run ($http) {
  dp.loader.fetch = url => $http({
    url,
    method: 'GET',
    transformResponse: data => data
  })
  .then(res => res.data);
}

export function dataservice () {
  // for v1.0.0-rc3 compatability
  return {
    loadPackage: async url => {
      const datapackage = await dp.load(url);
      datapackage.resourcesByName = datapackage.$resourcesByName;
      return datapackage;
    },
    normalizePackage: (url, datapackage) => {
      Object.assign(datapackage, {url});
      dp.normalizePackage(datapackage);
    },
    reloadResource: async resource => {
      resource = await dp.loader.resource(resource);
      return await dp.processor.resource(resource);
    },
    processPackage: async (url, datapackage) => {
      Object.assign(datapackage, {url});
      await dp.normalizePackage(datapackage);
      await dp.normalizeResources(datapackage);
      await dp.loadResources(datapackage);
      await dp.processPackage(datapackage);
      datapackage.resourcesByName = datapackage.$resourcesByName;
      return datapackage;
    }

    /* loadResource,
    _loadPackage: processPackage,  // todo: remove
    processPackage,

    normalize: normalizeResource,
    normalizePackage,
    processResource: processByType,

    reindexPackage,

    addResource */
  };

  /* function processPackage (filePath, datapackage) {
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
  } */
}

/* function createHttpRequest (resource) {
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
} */
