// import ono from 'ono';
import {toJS, extendObservable, asFlat, isObservable, autorun} from 'mobx';

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
  if (!System.production) {
    const processResource = dp.processor.resource.bind(dp.processor);
    dp.processor.resource = resource => {
      $log.debug('Processing', resource.name);
      return processResource(resource);
    };

    const index = dp.Normalizer.index.bind(dp.Normalizer);
    dp.Normalizer.index = datapackage => {
      $log.debug('Re-indexing', datapackage.name);
      return index(datapackage);
    };
  }

  const dataservice = {
    dp,
    normalize: dp.normalize,
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
    loadPackage: async(url, growl = false) => {
      let datapackage = await __loadPackageJson(url, growl);
      datapackage = await __loadPackageResources(datapackage, growl);
      return dataservice.makePackageObservable(datapackage);
      // return __processPackageResources(datapackage, growl);
    },
    processPackage: async (url, datapackage, growl = false) => {
      datapackage = __normalizePackage(url, datapackage);
      datapackage = __normalizePackageResourcesAndSchema(datapackage);
      await __loadPackageResources(datapackage, growl);
      return dataservice.makePackageObservable(datapackage);
      // return __processPackageResources(datapackage, growl);
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
    processResource: __processResource,
    normalizePackage: __normalizePackage,
    reloadResource: async resource => {
      try {
        Object.assign(resource, await dp.loader.resource(resource));
        return dp.processResource(resource);
      } catch (err) {
        $log.error(err);
        return resource;  // reject?
      }
    },
    makeResourceObservable: resource => {
      if (isObservable(resource)) {
        return resource;
      }

      if (typeof resource.content !== 'undefined' && typeof resource.data === 'undefined') {
        extendObservable(resource, {
          content: resource.content,
          mediatype: resource.mediatype,
          name: resource.name,
          get __data__ () {
            return dp.processor.resource(toJS(resource));
          },
          get data () {
            return resource.__data__.data;
          },
          get $error () {
            return resource.__data__.$error;
          },
          get errors () {
            return resource.__data__.errors;
          }
        });
      }

      autorun(() => {
        if (resource.$error) {
          resource.$error.message = resource.name;
          dataservice.warn(resource.$error, {title: 'Error processing resource'});
          resource.$valid = false;
        }
        $log.debug(`${resource.name} updated`);
      });

      return resource;
    },
    makePackageObservable: datapackage => {
      if (isObservable(datapackage)) {
        return datapackage;
      }

      return extendObservable(datapackage, {
        resources: asFlat(datapackage.resources.map(dataservice.makeResourceObservable)),
        get resourcesByName () {
          return dp.Normalizer.index(datapackage);
        },
        get $resourcesByName () {
          return datapackage.resourcesByName();
        }
      });
    }
  };

  function __processResource (res) {
    dp.processResource(res);
    if (res.$error) {
      res.$error.message = res.name;
      dataservice.warn(res.$error, {title: 'Error processing resource'});
      return Object.assign(res, {$valid: false});
    }
    return res;
  }

  /* function __processPackageResources (datapackage, growl = false) {
    try {
      datapackage.resources = datapackage.resources.map(r => __processResource(r));
      datapackage.resourcesByName = datapackage.$resourcesByName = dp.Normalizer.index(datapackage); // WARN: for backwords compat
      return datapackage;
    } catch (err) {
      const msg = 'Error processing dataPackage resources' +
        (err.statusText && err.data) ?
        `${err.statusText}; ${err.data}` :
        String(err);
      if (growl) {
        dataservice.error(msg);
      }
      throw ono(err, msg);
    }
  } */

  async function __loadPackageResources (datapackage, growl = false) {
    try {
      return await dp.loadResources(datapackage);
    } catch (err) {
      const msg = 'Error loading dataPackage resources' +
        (err.statusText && err.data) ?
        `${err.statusText}; ${err.data}` :
        String(err);
      if (growl) {
        dataservice.error(msg);
      }
      return Promise.reject(msg);
    }
  }

  function __normalizePackage (url, datapackage) {
    if (arguments.length === 2) {
      Object.assign(datapackage, {url});
    } else {
      datapackage = url;
    }
    return dp.normalizePackage(datapackage);
  }

  function __normalizePackageResourcesAndSchema (datapackage) {
    datapackage = dp.normalizeResources(datapackage);
    return dp.normalizeSchemas(datapackage);
  }

  async function __loadPackageJson (url, growl = false) {
    try {
      let datapackage = await dp.loader.datapackage(url);
      datapackage = __normalizePackage(datapackage);
      return __normalizePackageResourcesAndSchema(datapackage);
    } catch (err) {
      const msg = 'Error loading dataPackage' +
        (err.statusText && err.data) ?
        `${err.statusText}; ${err.data}` :
        String(err);
      if (growl) {
        dataservice.error(msg);
      }
      return Promise.reject(msg);
    }
  }

  return dataservice;
}
