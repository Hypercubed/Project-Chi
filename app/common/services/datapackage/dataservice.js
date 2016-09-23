import ono from 'ono';
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
    translators: dp.processor.translators,
    index: dp.Normalizer.index,
    warn: (err, opts) => {
      $log.warn(err);
      growl.warning(err.message || String(err), opts);
    },
    error: (err, opts) => {
      $log.error(err);
      growl.error(err.message || String(err), opts);
      return Promise.reject(err);
    },
    loadResource: async (datapackage, res) => {
      try {
        res = dp.normalize.resource(datapackage, res);
        if (!res.data) {
          res = await dp.loader.resource(res);
        }
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        return dataservice.error(msg, {title: 'Error loading resource'});
      }
      return dataservice.processResource(res);
    },
    normalizeResource: (p, r) => {
      return Object.assign(r, dp.normalize.resource(p, r));
    },
    processResource: res => {
      dp.processResource(res);
      if (res.$error) {
        res.$error.message = res.name;
        dataservice.warn(res.$error, {title: 'Error processing resource'});
        return Object.assign(res, {$valid: false});
      }
      return res;
    },
    loadPackage: async (url, growl = false) => {
      try {
        const datapackage = await dp.load(url);
        datapackage.resourcesByName = datapackage.$resourcesByName;  // WARN: for backwords compat
        datapackage.resources.forEach(res => {
          if (res.$error) {
            dataservice.warn(res.$error);
            Object.assign(res, {$valid: false});
          }
        });
        return datapackage;
      } catch (err) {
        const msg = 'Error loading dataPackage' +
          (err.statusText && err.data) ?
          `${err.statusText}; ${err.data}` :
          String(err);
        if (growl) {
          return dataservice.error(msg);
        }
        return Promise.reject(msg);
      }
    },
    normalizePackage: (url, datapackage) => {
      if (url) {
        Object.assign(datapackage, {url});
        dp.normalizePackage(datapackage);
      }
    },
    reloadResource: async resource => {
      try {
        Object.assign(resource, await dp.loader.resource(resource));
        return dp.processResource(resource);
      } catch (err) {
        $log.error(err);
        return resource;  // reject?
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
