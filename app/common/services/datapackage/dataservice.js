// import ono from 'ono';
import {toJS, autorun, isObservable} from 'mobx';

import {default as dp, Package, makeResource} from './datapackage';

const DEBUG = !System.production;

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
  if (DEBUG) {
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
    warn (err, opts) {
      $log.warn(err);
      growl.warning(err.message || String(err), opts); // TODO: make optional
    },
    error (err, opts) {
      $log.error(err);
      growl.error(err.message || String(err), opts);
      return Promise.reject(err);
    },
    async loadPackage (datapackage) { // TODO: errors
      try {
        return await makePackage(datapackage).load();
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        return dataservice.error(msg, {title: 'Error loading DataPackage'});
      }

      /* let datapackage = await __loadPackageJson(url, growl);
      datapackage = await __loadPackageResources(datapackage, growl);
      return dataservice.makePackageObservable(datapackage); */
      // return __processPackageResources(datapackage, growl);
    },
    async processPackage (url, datapackage) { // TODO: errors
      return await makePackage(url).update(datapackage);

      /* datapackage = __normalizePackage(url, datapackage);
      datapackage = __normalizePackageResourcesAndSchema(datapackage);
      await __loadPackageResources(datapackage, growl);
      return dataservice.makePackageObservable(datapackage); */
      // return __processPackageResources(datapackage, growl);
    },
    async loadResource (datapackage, res) {  // TODO: move to datapackage store action
      try {
        return await makeResource(datapackage, res).load();
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        return dataservice.error(msg, {title: 'Error loading resource'});
      }

      /*
      try {
        res = dp.normalize.resource(datapackage, res);
        if (!res.data) {
          res = await dp.loader.resource(res);
        }
      } catch (err) {
        const msg = (err.status) ? `${err.statusText}; ${err.data}` : String(err);
        return dataservice.error(msg, {title: 'Error loading resource'});
      }
      return dataservice.makeResourceObservable(res);
      // return dataservice.processResource(res); */
    },
    normalizeResource (p, r) { // deprecated
      return Object.assign(r, dp.normalize.resource(p, r));
    },
    processResource: __processResource,  // deprecated
    normalizePackage: __normalizePackage,  // deprecated
    async reloadResource (resource) {  // deprecated
      try {
        Object.assign(resource, await dp.loader.resource(resource));
        return dp.processResource(resource);
      } catch (err) {
        $log.error(err);
        return resource;  // reject?
      }
    },
    makeResourceObservable: makeResource, // deprecated
    /* resource => {
      if (isObservable(resource)) {
        return resource;
      }

      if (typeof resource.content !== 'undefined' && typeof resource.data === 'undefined') {
        extendObservable(resource, {
          content: resource.content,
          mediatype: resource.mediatype,
          name: resource.name
        });
      }

      autorun(() => {
        __processResource(resource);
      });

      return resource;
    },*/
    makePackageObservable: makePackage // deprecated
    /* datapackage => {
      if (isObservable(datapackage)) {
        return datapackage;
      }

      datapackage = extendObservable(datapackage, {
        resources: asFlat(datapackage.resources.map(dataservice.makeResourceObservable))
      });

      autorun(() => {
        datapackage.$resourcesByName = datapackage.resourcesByName = dp.Normalizer.index(datapackage);
        $log.debug(`${datapackage.name} re-indexed`);
      });

      return datapackage;
    }*/
  };

  function __processResource (resource) { // deprecated
    // get process results
    let processed = toJS(Object.assign({}, resource, {
      $error: null,
      errors: [],
      data: []
    }));
    try {
      processed = dp.processor.resource(processed);
      if (processed.errors && processed.errors.length > 0) {
        processed.$error = new Error(`Errors processing resource ${processed.name}`);
      }
    } catch (err) {
      processed.$error = err;
      processed.errors = processed.errors || [];
      processed.errors.shift({
        code: 'Parsing',
        type: err.name,
        message: `Parsing error: ${err.message}`
      });
    }

    // update resource
    if (processed.$error || processed.errors.length > 0) {
      resource.errors = processed.errors;
      resource.$error = processed.$error;
      resource.$error.message = resource.name;
      resource.$valid = false;
      dataservice.warn(resource.$error, {title: 'Error processing resource'});
    } else {
      resource.errors = [];
      resource.$error = null;
      resource.data = processed.data;
      resource.$lastValidContent = toJS(resource.content);
    }
    return resource;
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

  /* async function __loadPackageResources (datapackage, growl = false) {
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
  } */

  function __normalizePackage (url, datapackage) { // deprecated
    if (arguments.length === 2) {
      Object.assign(datapackage, {url});
    } else {
      datapackage = url;
    }
    return dp.normalizePackage(datapackage);
  }

  /* function __normalizePackageResourcesAndSchema (datapackage) {
    datapackage = dp.normalizeResources(datapackage);
    return dp.normalizeSchemas(datapackage);
  } */

  /* async function __loadPackageJson (url, growl = false) {
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
  } */

  function makePackage (datapackage) {
    if (isObservable(datapackage)) {
      return datapackage;
    }
    datapackage = new Package(datapackage);

    autorun(() => {  // TODO: make optional
      datapackage.resources.forEach(resource => {
        if (resource.errors && resource.errors.length > 0) {
          return dataservice.error(`Errors processing resource ${resource.name}`,
            {title: `Error processing DataPackage`});
        }
      });
    });

    return datapackage;
  }

  return dataservice;
}
