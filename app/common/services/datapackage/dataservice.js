import dp from './datapackage';

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

dataservice.$inject = ['$log', 'growl'];
export function dataservice ($log, growl) {
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
      try {
        Object.assign(resource, await dp.loader.resource(resource));
        dp.processResource(resource);
      } catch (err) {
        $log.error(err);
      }
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
  };
}
