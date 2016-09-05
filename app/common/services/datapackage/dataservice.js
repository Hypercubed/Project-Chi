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
  const dataservice = {
    mime: dp.normalize.mime,
    error: err => {
      $log.error(err);
      growl.error(String(err));
    },
    loadResource: async (datapackage, res) => {
      try {
        res = dp.normalize.resource(datapackage, res);
        res = await dp.loader.resource(res);
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        dataservice.error(msg);
        throw new Error(msg);
      }
      return dataservice.processResource(res);
    },
    processResource: res => {
      try {
        Object.assign(res, dp.processor.resource(res));
        if (res.errors && res.errors.length > 0) {
          throw new Error(`Errors processing resource ${res.name}`);
        }
        return res;
      } catch (err) {
        dataservice.error(err);
        return Object.assign(res, {$valid: false, $error: err});
      }
    },
    loadPackage: async url => {
      try {
        const datapackage = await dp.load(url);
        datapackage.resourcesByName = datapackage.$resourcesByName;
        return datapackage;
      } catch (err) {
        if (err.status) {
          throw new Error(`Error loading dataPackage; ${err.statusText}; ${err.data}`);
        }
        throw new Error(`Error loading dataPackage; ${err}`);
      }
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

  return dataservice;
}
