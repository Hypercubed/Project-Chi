/* global Papa */
/* global angular */

;(function() {
  'use strict';

  function papaTranslate(load, spec) {
    var parse = Papa.parse(load.content, spec);
    angular.extend(load, parse);
    load.table = true;
  }

  function DOS2UNIX(content) {
    return content
      .replace(/\r/g,'\n');
  }

  var _plugins = {};  // allow setting through api

  _plugins['text/tab-separated-values'] = {
    translate: function(load) {
      papaTranslate(load, {header: true, delimiter: '\t', skipEmptyLines: true});
    }
  };

  _plugins['text/csv'] = {
    translate: function(load) {
      papaTranslate(load, {header: true, delimiter: ',', skipEmptyLines: true});
    }
  };

  _plugins['text/plain'] = {
    translate: function(load) {
      load.content = DOS2UNIX(load.content);
    }
  };

  _plugins['application/json'] = {
    translate: function(load) {
      load.data = angular.fromJson(load.content);
      if (load.data.url && load.data.url.indexOf('api.github.com') > -1) {  // move
        load.data.name = load.data.owner.login +'/'+load.data.id;
        load.path = 'gists/'+load.data.id;
      }
    }
  };

  // try to follow http://dataprotocols.org/data-packages/

  function processByType(load) {
    var _p = _plugins[load.type];
    if (_p && _p.translate) {
      _p.translate(load);
    }
    load.isDirty = false;
    return load;
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

  angular.module('myApp.dataService',['myApp.mimeType'])
  .factory('DataServiceFactory', ['$http', '$q', '$log', 'mimeType', function($http, $q, $log, mimeType) { //todo: make a service, returns a dataPackage?

    function DataService(conn, id) { // todo: make more like SystemJS ({ baseUrl: '...', other options })
      this.conn = conn || 'data';
      this.id = id || 'index';
    }

    DataService.prototype.constructor = DataService;

    DataService.prototype.normalize = function(info) {
      var base = this.conn + '/' + this.id;

      if (!angular.isObject(info)) {  // if not already an object, make one
        info = { name: info, path: info, show: true };
      }

      info.path = info.path || info.filename;

      if (!info.url && info.path && base) {
        info.url = base + '/' + info.path;
      }

      if (!info.name && info.url) {
        info.name = info.url.split('/').pop();
      }

      if (!info.type && info.path) {
        info.type = mimeType(info.path); // todo: allow System type like 'text.txt!csv'
      }

      if (info.path.indexOf('api.github.com') > -1) {
        info.type = mimeType('json');
      }

      if (info.type.indexOf('text') !== 0 && info.type !== 'application/javascript') {
        info.show = false;
      }

      return info;
    };

    DataService.prototype.loadResource = function fetch(load) {
      if (load.url && !(load.content || load.data)) {
        return $http(httpReq(load));
      } else {
        return $q(function(resolve) {
          resolve({data: processByType(load)});
        });
      }
    };

    DataService.prototype.reparse = function reparse(file) {
      var resources = (arguments.length === 1) ? [file] : this.package.resources;
      resources.forEach(processByType);
    };

    DataService.prototype.load = function(conn, id) {

      this.conn = conn = conn || this.conn || 'data';
      this.id = id = id || this.id || 'index';

      var self = this;

      //this.clear();

      var path = (conn === 'gists') ?
        ['https://api.github.com',conn,id] :
        ['datapackage.json'];

      var _package = this.normalize({ name: id, path: path.join('/'), show: false });

      return this.loadResource(_package).then(function(res) {

        angular.extend(_package, res.data.data);

        if (conn === 'gists') {
          _package.resources = [];
          angular.forEach(_package.files, function(file) {
            _package.resources.push(file);
          });
        }

        _package.resources = _package.resources || ['index.html'];
        _package.resources = _package.resources.map(self.normalize, self);

        var q = _package.resources.map(self.loadResource);

        return $q.all(q).then(function() {
          return _package;
        });

      });

    };

    /* DataService.resolve = function(path) {
      path = path.split('/');
      return new DataService(path[0],path[1]);
    }; */

    return DataService;

  }]);

})();
