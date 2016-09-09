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
    warn: err => {
      $log.warn(err);
      growl.warning(String(err));
    },
    error: err => {
      $log.error(err);
      growl.error(String(err));
    },
    loadResource: async (datapackage, res) => {
      try {
        res = dp.normalize.resource(datapackage, res);
        if (!res.data) {
          res = await dp.loader.resource(res);
        }
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        dataservice.error(msg);
        throw ono(err, msg);
      }
      return dataservice.processResource(res);
    },
    normalizeResource: (p, r) => {
      return Object.assign(r, dp.normalize.resource(p, r));
    },
    processResource: res => {
      dp.processResource(res);
      if (res.$error) {
        $log.warn(res.$error);
        growl.warning(String(res.$error));
        return Object.assign(res, {$valid: false});
      }
      return res;
    },
    loadPackage: async url => {
      try {
        const datapackage = await dp.load(url);
        datapackage.resourcesByName = datapackage.$resourcesByName;
        datapackage.resources.forEach(r => {
          if (r.$error) {
            $log.warn(r.$error);
            growl.warning(String(r.$error));
          }
        });
        return datapackage;
      } catch (err) {
        if (err.statusText && err.data) {
          throw ono('Error loading dataPackage; %s; %s', err.statusText, err.data);
        }
        throw ono(err, 'Error loading dataPackage;');
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
